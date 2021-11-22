const express = require("express");
const connectDb = require("./config/db");
require("dotenv").config();

const app = express();

// Connect Database
connectDb();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUnning"));

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/clubs", require("./routes/api/clubs"));
app.use("/api/games", require("./routes/api/games"));
app.use("/api/leagues", require("./routes/api/leagues"));
app.use("/api/players", require("./routes/api/players"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/seasons", require("./routes/api/seasons"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
