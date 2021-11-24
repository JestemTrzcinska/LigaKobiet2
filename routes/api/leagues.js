import { Router } from "express";
import { check, validationResult } from "express-validator";

import { serverErrors, validate } from "../../const/exceptions.js";

import League from "../../models/League.js";

const router = Router();

// @route     POST api/leagues
// @desc      Add league
// @access    Public
router.post(
  "/",
  [check("name", validate.leagueName).not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      // See if the League exists
      const leagueFromDB = await League.findOne({ name });
      if (leagueFromDB) {
        return res.status(400).json({
          errors: [{ msg: serverErrors.leagueAlreadyExists }],
        });
      }

      // Create
      league = new League({ name });

      await league.save();
      res.json(league);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverErrors.serverError);
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
            msg: serverErrors.leaguesNotFound,
          },
        ],
      });
    }

    res.json(league);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverErrors.serverError);
  }
});

// @route     GET api/leagues/:leagueID
// @desc      Get league by ID
// @access    Public
router.get("/:leagueID", async (req, res) => {
  try {
    const league = await League.findOne({ _id: req.params.leagueID });

    if (!league) {
      return res
        .status(404)
        .json({ errors: [{ msg: serverErrors.leagueNotFound }] });
    }

    res.json(league);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        errors: [{ msg: serverErrors.leagueNotFound }],
      });
    }
    res.status(500).send(serverErrors.serverError);
  }
});

export default router;
