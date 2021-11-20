const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

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
      return res.status(400).json({ errors: errors.array() }); // bad request
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
      await user.save(); // in the db

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
