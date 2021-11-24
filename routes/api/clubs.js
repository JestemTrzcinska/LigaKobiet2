import { Router } from "express";
import { check, validationResult } from "express-validator";

import { validate, serverErrors } from "../../const/exceptions.js";

import Club from "../../models/Club.js";
import League from "../../models/League.js";
import Season from "../../models/Season.js";

const router = Router();

// @route     POST api/clubs
// @desc      Add club
// @access    Public
router.post(
  "/",
  [
    check("name", validate.clubName).not().isEmpty(),
    check("league", validate.leagueNameCurrent).not().isEmpty(),
    check("season", validate.seasonNameCurrent).not().isEmpty(),
    check("logo", validate.logo).isURL(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, logo, league, season, history } = req.body;

    try {
      const leagueFromDB = await League.findOne({
        name: league,
      });
      if (!leagueFromDB) {
        return res.status(404).json({
          errors: [{ msg: serverErrors.leagueNotFound }],
        });
      }

      const seasonFromDB = await Season.findOne({
        name: season,
      });
      if (!seasonFromDB) {
        return res.status(404).json({
          errors: [{ msg: serverErrors.seasonNotFound }],
        });
      }

      const seasons = [];
      seasons.push(seasonFromDB);
      let historyData;

      // check info in history
      if (history?.length > 0) {
        historyData = await Promise.all(
          history.map(async (item) => {
            let leagueDB = await League.findOne({ name: item.league });
            if (!leagueDB) {
              return res.status(404).json({
                errors: [{ msg: serverErrors.leagueNotFound }],
              });
            }

            let seasonDB = await Season.findOne({ name: item.season });
            if (!seasonDB) {
              return res.status(404).json({
                errors: [{ msg: serverErrors.seasonNotFound }],
              });
            }

            if (seasons.some((item) => item.id === seasonDB.id)) {
              return res.status(400).json({
                errors: [{ msg: serverErrors.invalidSeason }],
              });
            }

            seasons.push(seasonDB);

            return { league: leagueDB, season: seasonDB };
          })
        );
      }

      let club = await Club.findOne({
        name,
      });

      if (club) {
        // Update
        const clubUpdate = await Club.findOneAndUpdate(
          { _id: club._id },
          {
            $set: {
              name,
              logo,
              league: leagueFromDB,
              season: seasonFromDB,
              history: historyData,
            },
          },
          { new: true }
        );

        return res.json(clubUpdate);
      }

      // Create
      club = new Club({
        name,
        logo,
        league: leagueFromDB,
        season: seasonFromDB,
        history: historyData,
      });

      await club.save();
      res.json(club);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverErrors.serverError);
    }
  }
);

// @route     GET api/clubs
// @desc      Get all clubs
// @access    Public
router.get("/", async (req, res) => {
  try {
    const club = await Club.find()
      .populate("league")
      .populate("season")
      .populate("history.league")
      .populate("history.season");

    if (club.length === 0) {
      return res.status(404).json({
        errors: [{ msg: serverErrors.clubsNotFound }],
      });
    }

    res.json(club);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverErrors.serverError);
  }
});

// @route     GET api/clubs/:clubID
// @desc      Get club by ID
// @access    Public
router.get("/:clubID", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubID })
      .populate("league")
      .populate("season")
      .populate("history")
      .populate("history.league")
      .populate("history.season");

    if (!club) {
      return res.status(404).json({
        errors: [{ msg: serverErrors.clubNotFound }],
      });
    }

    res.json(club);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(404)
        .json({ errors: [{ msg: serverErrors.clubNotFound }] });
    }
    res.status(500).send(serverErrors.serverError);
  }
});

export default router;
