import { Router } from "express";
import { check, validationResult } from "express-validator";

import Player from "../../models/Player.js";

const router = Router();

// @route     POST api/players
// @desc      Add player
// @access    Public
router.post(
  "/",
  [
    check("firstName", "Imię zawodniczki jest wymagane.").not().isEmpty(),
    check("lastName", "Nazwisko zawodniczki jest wymagane.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { firstName, lastName, name, picture, birth } = req.body;

    // String in the right way - first letter is upper case, others are lower case
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }

    try {
      let player = await Player.findOne({
        firstName,
        lastName,
        birth,
      });

      if (player) {
        // Update
        player = await Player.findOneAndUpdate(
          {
            _id: player._id,
          },
          { $set: { firstName, lastName, name, picture, birth } },
          { new: true }
        );
        return res.json(player);
      }

      // Create
      player = new Player({
        firstName,
        lastName,
        name,
        picture,
        birth,
      });

      await player.save();
      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route     GET api/players
// @desc      Get all players
// @access    Public
router.get("/", async (req, res) => {
  try {
    const player = await Player.find();
    if (player.length === 0) {
      return res.status(404).json({
        errors: [{ msg: "Nie ma ani jednej zawodniczki w bazie danych." }],
      });
    }
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/players/:playerID
// @desc      Get player by ID
// @access    Public
router.get("/:playerID", async (req, res) => {
  try {
    const player = await Player.findOne({ _id: req.params.playerID });
    if (player.length === 0) {
      return res.status(404).json({
        errors: [{ msg: "Nie ma ani jednej zawodniczki w bazie danych." }],
      });
    }
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
