import { NextResponse } from "next/server";

// Allow the serverless function to run for up to 60 seconds (prevents Vercel 10s timeouts)
export const maxDuration = 60;

const DEFAULT_USERNAME = "Rishabhjain610";
const TOKEN = process.env.GITHUB_TOKEN;

const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 hours
const cache = new Map<string, { data: any; timestamp: number }>();

const GITHUB_GRAPHQL_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    login
    name
    avatarUrl
    followers { totalCount }
    following { totalCount }

    # Top 45 repositories with commit history (for charts)
    topRepos: repositories(first: 45, ownerAffiliations: [OWNER], orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        stargazerCount
        forkCount
        isFork
        isPrivate
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          totalSize
          edges {
            size
            node { name }
          }
        }
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 20) {
                nodes {
                  committedDate
                  author { user { login } name }
                }
              }
            }
          }
        }
        pullRequests { totalCount }
        issues { totalCount }
      }
    }

    # All repositories (up to 100) for total star/fork counts
    allRepos: repositories(first: 100, ownerAffiliations: [OWNER], orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        stargazerCount
        forkCount
        isFork
        isPrivate
      }
    }

    contributions: contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const username = searchParams.get("username") || DEFAULT_USERNAME;
  const refresh = searchParams.get("refresh") === "true";

  const now = new Date();
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const to = searchParams.get("to") || now.toISOString();
  const from = searchParams.get("from") || oneYearAgo.toISOString();

  return handleRequest(username, from, to, refresh);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = body.username || DEFAULT_USERNAME;
  const from = body.from || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
  const to = body.to || new Date().toISOString();
  const refresh = body.refresh === true;

  return handleRequest(username, from, to, refresh);
}

async function handleRequest(username: string, from: string, to: string, refresh: boolean) {
  if (!TOKEN) {
    return NextResponse.json({ error: "GITHUB_TOKEN is not configured" }, { status: 500 });
  }

  const cacheKey = `${username}-${from}-${to}`;
  const now = Date.now();

  if (!refresh && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (now - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }
  }

  console.log(`[GitHub API] Fetching stats for ${username} (${from} to ${to})`);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "RishabhWebsiteV2-Backend",
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username, from, to },
      }),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("[GitHub API Error]", {
        status: response.status,
        text: text.slice(0, 500),
      });
      throw new Error(`GitHub API error (${response.status})`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error("[GitHub GraphQL Error]", json.errors);
      throw new Error(json.errors[0]?.message || "GraphQL Error");
    }

    const user = json.data?.user;
    if (!user) throw new Error("User not found");

    const topRepos = user.topRepos?.nodes || [];
    const allRepos = user.allRepos?.nodes || [];

    let totalStars = 0;
    let totalForks = 0;
    let personalForks = 0;
    let publicReposCount = 0;

    // Use allRepos for aggregate stats
    allRepos.forEach((repo: any) => {
      totalStars += repo.stargazerCount || 0;
      totalForks += repo.forkCount || 0;
      if (repo.isFork) personalForks++;
      if (!repo.isPrivate) publicReposCount++;
    });

    const languagesMap: Record<string, number> = {};
    const commitLanguagesMap: Record<string, number> = {};
    const commitHourMap: Record<number, number> = {};
    const commitDayMap: Record<number, number> = {};

    let totalPRs = 0;
    let totalIssues = 0;

    // Use topRepos for detailed analysis (languages, hours, etc.)
    topRepos.forEach((repo: any) => {
      // Aggregate PRs/Issues from top repos (might be incomplete but better than nothing)
      totalPRs += repo.pullRequests?.totalCount || 0;
      totalIssues += repo.issues?.totalCount || 0;

      // Languages
      if (repo.languages?.edges) {
        repo.languages.edges.forEach((edge: any) => {
          const weight = edge.size / (repo.languages.totalSize || 1);
          languagesMap[edge.node.name] = (languagesMap[edge.node.name] || 0) + weight;
        });
      }

      // Commits distribution
      const commits = repo.defaultBranchRef?.target?.history?.nodes || [];
      const fromDate = new Date(from);
      const toDate = new Date(to);

      let userCommitsInRepo = 0;

      commits.forEach((commit: any) => {
        const isUser = commit.author?.user?.login?.toLowerCase() === username.toLowerCase() || commit.author?.name?.toLowerCase() === username.toLowerCase() || commit.author?.name?.toLowerCase().includes("rishabh");
        if (isUser) {
          const date = new Date(commit.committedDate);
          if (date >= fromDate && date <= toDate) {
            userCommitsInRepo++;
            // IST (+5:30)
            const istDate = new Date(date.getTime() + 330 * 60 * 1000);
            const hour = istDate.getUTCHours();
            const day = istDate.getUTCDay();

            commitHourMap[hour] = (commitHourMap[hour] || 0) + 1;
            commitDayMap[day] = (commitDayMap[day] || 0) + 1;
          }
        }
      });

      if (userCommitsInRepo > 0 && repo.languages?.edges?.length > 0) {
        const primaryLang = repo.languages.edges[0].node.name;
        commitLanguagesMap[primaryLang] = (commitLanguagesMap[primaryLang] || 0) + userCommitsInRepo;
      }
    });

    const totalWeight = Object.values(languagesMap).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languagesMap)
      .map(([name, weight]) => ({
        name,
        percentage: totalWeight > 0 ? Math.round((weight / totalWeight) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10);

    const totalCommitWeight = Object.values(commitLanguagesMap).reduce((a, b) => a + b, 0);
    const topLanguagesByCommit = Object.entries(commitLanguagesMap)
      .map(([name, weight]) => ({
        name,
        percentage: totalCommitWeight > 0 ? Math.round((weight / totalCommitWeight) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10);

    const commitsByHour = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: commitHourMap[hour] || 0,
    }));

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const commitsByDay = days.map((name, i) => ({
      name,
      count: commitDayMap[i] || 0,
    }));

    const dailyContributions = (user.contributions?.contributionCalendar?.weeks || [])
      .flatMap((week: any) =>
        week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      );

    // Streak calculation
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let currentStart = "";
    let longestStart = "";
    let longestEnd = "";

    const today = new Date().toISOString().split("T")[0];
    const sortedDays = [...dailyContributions].sort((a, b) => a.date.localeCompare(b.date));

    for (const day of sortedDays) {
      if (day.count > 0) {
        if (tempStreak === 0) currentStart = day.date;
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
          longestStart = currentStart;
          longestEnd = day.date;
        }
      } else {
        tempStreak = 0;
      }
    }

    // Current streak (counting backwards from today)
    const reversedDays = [...sortedDays].reverse();
    for (const day of reversedDays) {
      if (day.date > today) continue;
      if (day.count > 0) {
        currentStreak++;
      } else if (day.date === today) {
        continue;
      } else {
        break;
      }
    }

    const result = {
      username,
      publicRepos: user.allRepos?.totalCount || publicReposCount || 0,
      followers: user.followers?.totalCount || 0,
      following: user.following?.totalCount || 0,
      totalStars,
      totalForks,
      totalPRs,
      totalIssues,
      personalForks,
      totalContributions: user.contributions?.contributionCalendar?.totalContributions || 0,
      dailyContributions,
      topLanguages,
      topLanguagesByCommit,
      commitsByHour,
      commitsByDay,
      streaks: {
        current: currentStreak,
        longest: longestStreak,
        currentPeriod: currentStreak > 0 ? "Active" : "None",
        longestPeriod: longestStreak > 0 ? `${longestStart} - ${longestEnd}` : "None",
        grade: longestStreak > 50 ? "S" : longestStreak > 20 ? "A" : longestStreak > 10 ? "B" : "C",
      },
      contributionTypes: [
        { name: "Commits", value: user.contributions?.totalCommitContributions || 0 },
        { name: "PRs", value: user.contributions?.totalPullRequestContributions || 0 },
        { name: "Issues", value: user.contributions?.totalIssueContributions || 0 },
        { name: "Repos", value: user.contributions?.totalRepositoryContributions || 0 },
      ],
      from,
      to,
    };

    cache.set(cacheKey, { data: result, timestamp: now });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[GitHub API Handler Error]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
