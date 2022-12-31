import { Octokit } from "octokit";

export default defineEventHandler(async (event) => {
  const octokit = new Octokit({
    auth: process.env.NUXT_PUBLIC_GITHUB_TOKEN, // Change in .env
  });

  function transformGithubData(repo: any) {
    const desc = repo.description ?? "No description";
    return {
      name: repo.name,
      description: desc,
      created: repo.created_at.split("T")[0],
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks,
    };
  }

  const data = await octokit.request("GET /users/{username}/repos", {
    username: "Dmytro-Tihunov", // Your github username
  });

  return data.data.map((rep) => {
    return transformGithubData(rep);
  });
});
