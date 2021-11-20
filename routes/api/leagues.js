const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const League = require("../../models/League");

// @route     POST api/leagues
// @desc      Add league
// @access    Public
router.post(
  "/",
  [check("name", "Nazwa jest wymagana.").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { name } = req.body;

    // See if the League exists
    const leagueFromDB = await League.findOne({ name });
    if (leagueFromDB) {
      return res.status(400).json({
        errors: [{ msg: "Taka liga już istnieje w bazie danych." }],
      });
    }
    try {
      // Create
      league = new League({ name });

      await league.save();
      res.json(league);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route     GET api/leagues
// @desc      Get leagues
// @access    Public
router.get("/", async (req, res) => {
  try {
    const league = await League.find();

    if (league.length === 0) {
      return res.status(404).json({
        errors: [
          {
            msg: "Nie ma ani jednej ligi w bazie danych.",
          },
        ],
      });
    }

    res.json(league);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/leagues/:leagueID
// @desc      Get league by ID
// @access    Public
router.get("/:leagueID", async (req, res) => {
  try {
    const league = await League.findOne({ _id: req.params.leagueID });

    if (league.lenght === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Nie ma ani jednej ligi w bazie danych." }] });
    }

    res.json(league);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
