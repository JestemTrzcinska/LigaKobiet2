import mongoose from "mongoose";

const SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("season", SeasonSchema);
