import { Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readFile } from "fs/promises";

import User from "../../models/User.js";

const router = Router();

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  "/",
  [
    check("firstName", "Proszę o podanie swojego imienia").not().isEmpty(),
    check("lastName", "Proszę o podanie swojego nazwiska.").not().isEmpty(),
    check("email", "Proszę o podanie prawidłowego maila.").isEmail(),
    check(
      "password",
      "Słabe hasło! Wprowadź kombinację przynajmniej sześciu liter i cyfr." // i znaków interpunktycjnych.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      // See if the User exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "Użytkownik o podanym emailu już istnieje." }],
        });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const info = JSON.parse(
        await readFile(new URL("../../config/default.json", import.meta.url))
      );

      jwt.sign(payload, info.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

export default router;
