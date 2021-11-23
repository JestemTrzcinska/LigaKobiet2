import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  favClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "club",
  },
  city: {
    type: String,
  },
  about: {
    type: String,
  },
});

export default mongoose.model("profile", ProfileSchema);
