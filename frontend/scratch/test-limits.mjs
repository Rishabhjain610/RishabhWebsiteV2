import fetch from "node-fetch";

const username = "Rishabhjain610";

const GITHUB_GRAPHQL_QUERY = `
query($username: String!) {
  user(login: $username) {
    login
    topRepos: repositories(first: 45, ownerAffiliations: [OWNER], orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          totalSize
          edges { size node { name } }
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
      }
    }
  }
}
`;

async function test() {
  const now = new Date();
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  
  const fs = await import('fs');
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const tokenMatch = envContent.match(/GITHUB_TOKEN=(.+)/);
  const token = tokenMatch ? tokenMatch[1].trim() : null;

  if (!token) {
    console.error("NO TOKEN");
    return;
  }

  const start = Date.now();
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "GitHub-Stats-Script",
    },
    body: JSON.stringify({
      query: GITHUB_GRAPHQL_QUERY,
      variables: {
        username,
        from: oneYearAgo.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  const end = Date.now();
  console.log(`Request took ${end - start}ms`);

  if (!res.ok) {
    console.error(`Error: ${res.status} ${res.statusText}`);
  } else {
    const data = await res.json();
    if (data.errors) {
       console.error("GraphQL Errors:", data.errors);
    } else {
       console.log("Success! Fetched top repos:", data.data.user.topRepos.nodes.length);
    }
  }
}

test();
