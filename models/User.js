import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    reqired: true,
  },
  lastName: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isStaff: {
    type: Boolean,
  },
});

export default mongoose.model("user", UserSchema);
