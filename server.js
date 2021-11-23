import express from "express";
import { connectDB } from "./config/db.js";

import auth from "./routes/api/auth.js";
import clubs from "./routes/api/clubs.js";
import games from "./routes/api/games.js";
import leagues from "./routes/api/leagues.js";
import players from "./routes/api/players.js";
import profile from "./routes/api/profile.js";
import seasons from "./routes/api/seasons.js";
import users from "./routes/api/users.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUnning"));

// Define routes
app.use("/api/auth", auth);
app.use("/api/clubs", clubs);
app.use("/api/games", games);
app.use("/api/leagues", leagues);
app.use("/api/players", players);
app.use("/api/profile", profile);
app.use("/api/seasons", seasons);
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
