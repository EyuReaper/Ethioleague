require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;



// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.dc9cd9rjv,
  api_key: process.env.871222164664597,
  api_secret: process.env.yPW9eYj8nee6peRMLHqAL7e9EwI,
});


// Multer Setup for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) return res.status(500).json({ error: "Upload failed" });
      res.json({ url: result.secure_url });
    }).end(req.file.buffer);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const API_KEY = process.env.FOOTBALL_API_KEY;
const LEAGUE_ID = "273"; // Ethiopian Premier League ID
const SEASON = "2025"; // Current season

app.get("/match/:id", async (req, res) => {
  try {
    const matchId = req.params.id;

    // Fetch match details
    const matchResponse = await axios.get(
      `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
      { headers: { "x-apisports-key": API_KEY } }
    );

    // Fetch head-to-head history
    const h2hResponse = await axios.get(
      `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${matchResponse.data.response[0].teams.home.id}-${matchResponse.data.response[0].teams.away.id}`,
      { headers: { "x-apisports-key": API_KEY } }
    );

    // Fetch lineups
    const lineupResponse = await axios.get(
      `https://v3.football.api-sports.io/fixtures/lineups?fixture=${matchId}`,
      { headers: { "x-apisports-key": API_KEY } }
    );

    res.json({
      match: matchResponse.data.response[0],
      h2h: h2hResponse.data.response,
      lineups: lineupResponse.data.response,
    });
  } catch (error) {
    console.error("Error fetching match details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/standings", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${SEASON}`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    res.json(response.data.response[0].league.standings[0]);
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Emit live updates every 30 seconds
setInterval(async () => {
  const fixtures = await fetchFixtures();
  io.emit("fixturesUpdate", fixtures);
}, 30000); // Update every 30 seconds

// API Route to get initial fixtures
app.get("/fixtures", async (req, res) => {
  const fixtures = await fetchFixtures();
  res.json(fixtures);
});

server.listen(5000, () => console.log("Server running on port 5000 🚀"));