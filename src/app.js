import express from "express";
import dotenv from "dotenv";
import { getAllCommits } from "./api/github.js";

dotenv.config();

const app = express();

app.get("/github/all_commits", async (req, res) => {
  const commits = await getAllCommits("SusieHatter", {
    per_page: 100,
    author: "SusieHatter",
  });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(commits));
});

app.listen("8080");
console.log("running at http://localhost:8080");
