import mongoose from "mongoose";

const info = JSON.parse(
  await readFile(new URL("./default.json", import.meta.url))
);

import { readFile } from "fs/promises";

export const connectDB = async () => {
  try {
    await mongoose.connect(info.mongoURI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
