import mongoose from "mongoose";

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

export default mongoose.model("club", ClubSchema);
