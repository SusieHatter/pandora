import express from "express";
import dotenv from "dotenv";
import { getAllCommits } from "./api/github.js";

dotenv.config();

const app = express();

app.get("/github/all_commits", async (req, res) => {
  console.log("fetching all commits");
  const commits = await getAllCommits("SusieHatter", {
    per_page: 100,
    author: "SusieHatter",
  });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(commits));
});

const port = process.env.PORT || 8080;
app.listen(`${port}`);
console.log(`running at http://localhost:${port}`);
