import { Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readFile } from "fs/promises";

import { validate, serverErrors } from "../../const/exceptions.js";

import User from "../../models/User.js";

const router = Router();

const defaultURL = "../../config/default.json";

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  "/",
  [
    check("firstName", validate.userFirstName).not().isEmpty(),
    check("lastName", validate.userLastName).not().isEmpty(),
    check("email", validate.email).isEmail(),
    check("password", validate.insecurePassword).isLength({ min: 6 }),
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
          errors: [{ msg: serverErrors.userAlreadyExists }],
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
        await readFile(new URL(defaultURL, import.meta.url))
      );

      jwt.sign(payload, info.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverErrors.serverError);
    }
  }
);

export default router;
