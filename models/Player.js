import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    reqired: true,
  },
  lastName: {
    type: String,
    reqired: true,
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
});

export default mongoose.model("player", PlayerSchema);
