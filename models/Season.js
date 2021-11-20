const mongoose = require("mongoose");

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

module.exports = Season = mongoose.model("season", SeasonSchema);
