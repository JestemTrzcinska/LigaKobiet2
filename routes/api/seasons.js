const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const Season = require("../../models/Season");

// @route     POST api/seasons
// @desc      Add season
// @access    Public
router.post(
  "/",
  [
    check("name", "Nazwa jest wymagana.").not().isEmpty(),
    check("from", "Podanie daty 'od' jest wymagane.").not().isEmpty(),
    check("to", "Podanie daty 'do' jest wymagane.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, from, to } = req.body;

    if (new Date(from) >= new Date(to)) {
      return res.status(400).json({
        errors: [{ msg: "Data 'od' musi być przed datą 'po'." }],
      });
    }

    try {
      // See if the Season exists
      let seasonFromDB = await Season.findOne({ name, from, to });
      if (seasonFromDB) {
        return res.status(400).json({
          errors: [{ msg: "Taki sezon już istnieje." }],
        });
      }

      let season = await Season.findOne({ name });
      if (season) {
        // Update
        const seasonUpdate = await Season.findOneAndUpdate(
          { _id: season._id },
          { $set: { name, from, to } },
          { new: true }
        );

        return res.json(seasonUpdate);
      }

      // Create
      season = new Season({
        name,
        from,
        to,
      });

      await season.save();
      res.json(season);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route     GET api/seasons
// @desc      Get all seasons
// @access    Public
router.get("/", async (req, res) => {
  try {
    const season = await Season.find();

    if (season.length === 0) {
      return res.status(404).json({
        errors: [
          {
            msg: "Nie ma ani jednego sezonu w bazie danych.",
          },
        ],
      });
    }

    res.json(season);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/seasons/:seasonID
// @desc      Get season by ID
// @access    Public
router.get("/:seasonID", async (req, res) => {
  try {
    const season = await Season.findOne({ _id: req.params.seasonID });

    if (!season) {
      return res.status(404).json({
        errors: [{ msg: "Nie ma ani jednego sezonu w bazie danych." }],
      });
    }

    res.json(season);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "Sezonu nie znaleziono w bazie danych" }] });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
