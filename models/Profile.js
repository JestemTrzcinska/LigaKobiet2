const mongoose = require("mongoose");

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

module.exports = Profile = mongoose.model("profile", ProfileSchema);
