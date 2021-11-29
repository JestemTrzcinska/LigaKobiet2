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
  clubs: [
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
      type: Object,
      required: true,
    },
  ],
});

export default mongoose.model("player", PlayerSchema);
