import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "club",
  },
  away: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "club",
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "league",
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "season",
  },
  round: {
    type: Number,
    required: true,
  },
  isFinished: {
    type: Boolean,
  },
  date: {
    type: Date,
    required: true,
  },
  goals: [
    {
      amount: {
        type: Number,
        min: 0,
        required: true,
      },
      goalForTeamHome: {
        type: Boolean,
        default: true,
        required: true,
      },
      shotBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player",
        required: true,
      },
      required: false,
    },
  ],
});

export default mongoose.model("game", GameSchema);
