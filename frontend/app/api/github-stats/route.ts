import { NextResponse } from "next/server";

const DEFAULT_USERNAME = "Rishabhjain610";
const TOKEN = process.env.GITHUB_TOKEN;

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Cache per username + date range
const cache = new Map<
  string,
  { data: any; timestamp: number }
>();

const GITHUB_GRAPHQL_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    followers { totalCount }
    following { totalCount }

    repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER) {
      totalCount
      nodes {
        stargazerCount
        forkCount
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
            }
          }
        }
      }
    }

    contributions: contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      contributionCalendar {
        totalContributions
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
  const oneYearAgo = new Date(
    now.getTime() - 365 * 24 * 60 * 60 * 1000
  );

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
    const oneYearAgo = new Date(
      now.getTime() - 365 * 24 * 60 * 60 * 1000
    );

    const to = body.to || now.toISOString();
    const from = body.from || oneYearAgo.toISOString();

    return handleRequest(username, from, to, refresh);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

async function handleRequest(
  username: string,
  from: string,
  to: string,
  refresh: boolean
) {
  if (!TOKEN) {
    return NextResponse.json(
      { error: "No GITHUB_TOKEN configured" },
      { status: 500 }
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
        json?.errors?.[0]?.message ||
        `GitHub API error (${response.status})`;
      throw new Error(message);
    }

    const user = json.data?.user;
    if (!user) throw new Error("User not found");

    const repos = user.repositories?.nodes || [];

    let totalStars = 0;
    let totalForks = 0;
    const languageSizeMap: Record<string, number> = {};

    repos.forEach((repo: any) => {
      totalStars += repo.stargazerCount || 0;
      totalForks += repo.forkCount || 0;

      repo.languages?.edges?.forEach((edge: any) => {
        const lang = edge.node.name;
        const size = edge.size;

        languageSizeMap[lang] =
          (languageSizeMap[lang] || 0) + size;
      });
    });

    const totalSize = Object.values(languageSizeMap).reduce(
      (a, b) => a + b,
      0
    );

    const topLanguages = Object.entries(languageSizeMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, size]) => ({
        name,
        percentage:
          totalSize > 0
            ? Math.round((size / totalSize) * 1000) / 10
            : 0,
      }));

    const totalContributions =
      user.contributions?.contributionCalendar
        ?.totalContributions || 0;

    const result = {
      username,
      publicRepos: user.repositories?.totalCount || 0,
      followers: user.followers?.totalCount || 0,
      following: user.following?.totalCount || 0,
      totalStars,
      totalForks,
      totalContributions,
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
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}