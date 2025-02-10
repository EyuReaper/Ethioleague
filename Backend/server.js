require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.FOOTBALL_API_KEY;
const LEAGUE_ID = "273"; // Ethiopian Premier League ID
const SEASON = "2025"; // Current season

app.get("/fixtures", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    res.json(response.data.response);
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
