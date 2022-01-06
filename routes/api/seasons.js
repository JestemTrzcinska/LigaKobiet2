import { Router } from "express";
import { check, validationResult } from "express-validator";

import { serverErrors, validate } from "../../const/exceptions.js";

import Season from "../../models/Season.js";

const router = Router();

// @route     POST api/seasons
// @desc      Add season
// @access    Public
router.post(
  "/",
  [
    check("name", validate.seasonName).not().isEmpty(),
    check("from", validate.seasonFrom).not().isEmpty(),
    check("to", validate.seasonTo).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, from, to } = req.body;

    if (new Date(from) >= new Date(to)) {
      return res.status(400).json({
        errors: [{ msg: serverErrors.invalidDateSeason }],
      });
    }

    try {
      // See if the Season exists
      let seasonFromDB = await Season.findOne({ name, from, to });
      if (seasonFromDB) {
        return res.status(400).json({
          errors: [{ msg: serverErrors.seasonAlreadyExists }],
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
      res.status(500).send(serverErrors.serverError);
    }
  }
);

// @route     GET api/seasons
// @desc      Get all seasons
// @access    Public
router.get("/", async (req, res) => {
  try {
    const season = await Season.find().sort({ name: -1 });

    if (season.length === 0) {
      return res.status(404).json({
        errors: [{ msg: serverErrors.seasonsNotFound }],
      });
    }

    res.json(season);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverErrors.serverError);
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
        errors: [{ msg: serverErrors.seasonNotFound }],
      });
    }

    res.json(season);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(404)
        .json({ errors: [{ msg: serverErrors.seasonNotFound }] });
    }
    res.status(500).send(serverErrors.serverError);
  }
});

export default router;
