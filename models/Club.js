const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "league",
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "season",
  },
  history: [
    {
      league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "league",
      },
      season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "season",
      },
    },
  ],
});

module.exports = Club = mongoose.model("club", ClubSchema);
