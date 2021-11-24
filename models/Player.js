import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  birth: {
    type: Date,
  },
  club: {
    type: Object,
    required: true,
    league: {
      type: mongoose.Types.ObjectId,
      ref: "league",
      required: true,
    },
    season: {
      type: mongoose.Types.ObjectId,
      ref: "season",
      required: true,
    },
    club: {
      type: mongoose.Types.ObjectId,
      ref: "club",
      required: true,
    },
  },
  history: [
    {
      league: {
        type: mongoose.Types.ObjectId,
        ref: "league",
        required: true,
      },
      season: {
        type: mongoose.Types.ObjectId,
        ref: "season",
        required: true,
      },
      club: {
        type: mongoose.Types.ObjectId,
        ref: "club",
        required: true,
      },
      required: false,
    },
  ],
});

export default mongoose.model("player", PlayerSchema);
