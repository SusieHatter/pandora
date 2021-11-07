import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getAllCommits, getRepos, getRepoCommits } from "./api/github.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [/susie.mx$/, /localhost/, /127.0.0.1/],
  })
);

app.get("/github/all_commits", async (req, res) => {
  console.log("fetching all commits");
  const commits = await getAllCommits("SusieHatter", {
    per_page: 100,
    author: "SusieHatter",
  });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(commits));
});

app.get("/github/repos", async (req, res) => {
  console.log("fetching all repos");
  const repos = await getRepos("SusieHatter", {
    per_page: 100,
    sort: "created_at",
  });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(repos));
});

app.get("/github/repos/:repoName/commits", async (req, res) => {
  const repoName = req.params.repoName;
  console.log(`fetching commits from ${repoName}`);
  const commits = await getRepoCommits("SusieHatter", repoName, {
    per_page: 100,
    author: "SusieHatter",
  });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(commits));
});

const port = process.env.PORT || 8080;
app.listen(`${port}`);
console.log(`running at http://localhost:${port}`);
