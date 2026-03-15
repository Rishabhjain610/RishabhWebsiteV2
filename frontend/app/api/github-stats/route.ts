import { NextResponse } from "next/server";

const DEFAULT_USERNAME = "Rishabhjain610";
const TOKEN = process.env.GITHUB_TOKEN;

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Cache per username + date range
const cache = new Map<string, { data: any; timestamp: number }>();

const GITHUB_GRAPHQL_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    followers { totalCount }
    following { totalCount }

    repositories(first: 100, ownerAffiliations: OWNER) {
      totalCount
      nodes {
        stargazerCount
        forkCount
        isPrivate
        isArchived
        primaryLanguage { name }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
            }
          }
        }
        pullRequests(first: 50) {
          totalCount
          nodes {
            state
            createdAt
          }
        }
        issues(first: 50) {
          totalCount
          nodes {
            state
            createdAt
          }
        }
        ref(qualifiedName: "main") {
          target {
            ... on Commit {
              history(first: 100) {
                nodes {
                  committedDate
                  author {
                    user {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    contributions: contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      restrictedContributionsCount
      startedAt
      endedAt
      latestRestrictedContributionDate
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
    # For streaks, we need a larger window or multiple collections, 
    # but for now let's get the standard for the year.
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
  try {
    const body = await req.json();

    const username = body.username || DEFAULT_USERNAME;
    const refresh = body.refresh === true;

    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    const to = body.to || now.toISOString();
    const from = body.from || oneYearAgo.toISOString();

    return handleRequest(username, from, to, refresh);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

async function handleRequest(
  username: string,
  from: string,
  to: string,
  refresh: boolean,
) {
  if (!TOKEN) {
    return NextResponse.json(
      { error: "No GITHUB_TOKEN configured" },
      { status: 500 },
    );
  }

  const cacheKey = `${username}-${from}-${to}`;
  const now = Date.now();

  // Cache check
  if (!refresh && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (now - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username, from, to },
      }),
      cache: "no-store",
    });

    const json = await response.json();

    if (!response.ok || json.errors) {
      const message =
        json?.errors?.[0]?.message || `GitHub API error (${response.status})`;
      throw new Error(message);
    }

    const user = json.data?.user;
    if (!user) throw new Error("User not found");

    const repos = user.repositories?.nodes || [];

    let totalStars = 0;
    let totalForks = 0;
    let totalPRs = 0;
    let totalIssues = 0;
    const languageSizeMap: Record<string, number> = {};
    const languageCommitMap: Record<string, number> = {};
    const commitHourMap: Record<number, number> = {};
    const commitDayMap: Record<number, number> = {}; // 0-6 Sun-Sat

    repos.forEach((repo: any) => {
      totalStars += repo.stargazerCount || 0;
      totalForks += repo.forkCount || 0;
      totalPRs += repo.pullRequests?.totalCount || 0;
      totalIssues += repo.issues?.totalCount || 0;

      const repoLangs = repo.languages?.edges || [];
      const mainLang = repo.primaryLanguage?.name || repoLangs[0]?.node?.name;

      repoLangs.forEach((edge: any) => {
        const lang = edge.node.name;
        const size = edge.size;
        languageSizeMap[lang] = (languageSizeMap[lang] || 0) + size;
      });

      // Rough commit analysis from last 100 commits of main
      const commits = repo.ref?.target?.history?.nodes || [];
      commits.forEach((commit: any) => {
        if (commit.author?.user?.login === username) {
          const date = new Date(commit.committedDate);
          const hour = date.getUTCHours();
          const day = date.getUTCDay();

          commitHourMap[hour] = (commitHourMap[hour] || 0) + 1;
          commitDayMap[day] = (commitDayMap[day] || 0) + 1;

          if (mainLang) {
            languageCommitMap[mainLang] =
              (languageCommitMap[mainLang] || 0) + 1;
          }
        }
      });
    });

    const totalSize = Object.values(languageSizeMap).reduce((a, b) => a + b, 0);

    const topLanguages = Object.entries(languageSizeMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, size]) => ({
        name,
        percentage:
          totalSize > 0 ? Math.round((size / totalSize) * 1000) / 10 : 0,
      }));

    const totalCommits = Object.values(languageCommitMap).reduce(
      (a, b) => a + b,
      0,
    );
    const topLanguagesByCommit = Object.entries(languageCommitMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage:
          totalCommits > 0 ? Math.round((count / totalCommits) * 1000) / 10 : 0,
      }));

    const commitsByHour = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: commitHourMap[i] || 0,
    }));

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const commitsByDay = dayNames.map((name, i) => ({
      name,
      count: commitDayMap[i] || 0,
    }));

    const totalContributions =
      user.contributions?.contributionCalendar?.totalContributions || 0;

    const dailyContributions = (
      user.contributions?.contributionCalendar?.weeks || []
    ).flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    );

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let streakStart = "";
    let streakEnd = "";
    let longestStart = "";
    let longestEnd = "";

    const today = new Date().toISOString().split("T")[0];
    const sortedDays = [...dailyContributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    sortedDays.forEach((day: any) => {
      if (day.count > 0) {
        tempStreak++;
        if (tempStreak === 1) streakStart = day.date;
        streakEnd = day.date;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
          longestStart = streakStart;
          longestEnd = streakEnd;
        }
      } else {
        tempStreak = 0;
      }
    });

    // Current streak logic: check if the streak includes today or yesterday
    const lastDayWithCommits = [...sortedDays]
      .reverse()
      .find((d: any) => d.count > 0);
    if (lastDayWithCommits) {
      const lastDate = new Date(lastDayWithCommits.date);
      const diffDays = Math.floor(
        (new Date().getTime() - lastDate.getTime()) / (1000 * 3600 * 24),
      );
      if (diffDays <= 1) {
        // Find the streak that ends at lastDayWithCommits
        let count = 0;
        for (let i = sortedDays.length - 1; i >= 0; i--) {
          if (new Date(sortedDays[i].date) > lastDate) continue;
          if (sortedDays[i].count > 0) count++;
          else break;
        }
        currentStreak = count;
      }
    }

    const publicReposCount = repos.filter((r: any) => !r.isPrivate).length;

    const result = {
      username,
      publicRepos: publicReposCount || user.repositories?.totalCount || 0,
      followers: user.followers?.totalCount || 0,
      following: user.following?.totalCount || 0,
      totalStars,
      totalForks,
      totalPRs,
      totalIssues,
      totalContributions,
      dailyContributions,
      topLanguagesByCommit,
      commitsByHour,
      commitsByDay,
      streaks: {
        current: currentStreak,
        longest: longestStreak,
        longestPeriod:
          longestStart && longestEnd
            ? `${new Date(longestStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(longestEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
            : "",
        currentPeriod:
          currentStreak > 0
            ? `${new Date(streakStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(streakEnd).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
            : "No active streak",
        totalContributions,
        grade:
          totalContributions > 500
            ? "S"
            : totalContributions > 300
              ? "A+"
              : totalContributions > 100
                ? "A"
                : "B",
      },
      contributionTypes: [
        {
          name: "Commits",
          value: user.contributions?.totalCommitContributions || 0,
        },
        {
          name: "PRs",
          value: user.contributions?.totalPullRequestContributions || 0,
        },
        {
          name: "Issues",
          value: user.contributions?.totalIssueContributions || 0,
        },
        {
          name: "Repos",
          value: user.contributions?.totalRepositoryContributions || 0,
        },
      ],
      yearlyContributions: [
        {
          year: new Date(from).getFullYear(),
          count: totalContributions,
        },
      ],
      from,
      to,
      lastUpdated: now,
      topLanguages,
    };

    // Save cache
    cache.set(cacheKey, {
      data: result,
      timestamp: now,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
