import fetch from "node-fetch";

const BASE_URL = "https://api.github.com";

const buildUrl = (path, options) => {
  const url = new URL(`${BASE_URL}/${path}`);
  Object.entries(options).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );
  return url.toString();
};

export const getRepos = async (username, options = {}) => {
  const url = buildUrl(`users/${username}/repos`, options);
  return fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  }).then((res) => res.json());
};

export const getRepoCommits = async (username, repoName, options = {}) => {
  const url = buildUrl(`repos/${username}/${repoName}/commits`, options);
  return fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  }).then((res) => res.json());
};

export const getAllCommits = async (username, options = {}) => {
  const repos = await getRepos(username, options);
  const reposCommits = await Promise.all(
    repos.map((repo) => getRepoCommits(username, repo.name, options))
  );
  return reposCommits.flat();
};
