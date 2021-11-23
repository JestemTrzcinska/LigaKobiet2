import jwt from "jsonwebtoken";
import { readFile } from "fs/promises";

const info = JSON.parse(
  await readFile(new URL("../config/default.json", import.meta.url))
);

export default (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, info.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
