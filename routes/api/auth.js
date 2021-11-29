import { Router } from "express";
import auth from "../../middleware/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { readFile } from "fs/promises";

import { serverErrors, validate } from "../../const/exceptions.js";

import User from "../../models/User.js";

const router = Router();

const defaultURL = "../../config/default.json";

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverErrors.serverError);
  }
});

// @route     POST api/auth
// @desc      Authenticate user & get token
// @access    Public
router.post(
  "/",
  [
    check("email", validate.email).isEmail(),
    check("password", validate.password).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if the User exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: serverErrors.incorrectLogin }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: serverErrors.incorrectLogin }],
        });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const info = JSON.parse(
        await readFile(new URL(defaultURL, import.meta.url))
      );

      jwt.sign(payload, info.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverErrors.serverError);
    }
  }
);

export default router;
