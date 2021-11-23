const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Club = require("../../models/Club");
const League = require("../../models/League");
const Season = require("../../models/Season");

// @route     POST api/clubs
// @desc      Add club
// @access    Public
router.post(
  "/",
  [
    check("name", "Nazwa klubu jest wymagana.").not().isEmpty(),
    check("league", "Podanie aktualnej ligi jest wymagane.").not().isEmpty(),
    check("season", "Podanie aktualnego sezonu jest wymagane.").not().isEmpty(),
    check("logo", "Logo musi być linkiem do zdjęcia.").isURL(),
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
        return res.status(400).json({
          errors: [{ msg: "Taka liga nie istnieje w bazie danych." }],
        });
      }

      const seasonFromDB = await Season.findOne({
        name: season,
      });
      if (!seasonFromDB) {
        return res.status(400).json({
          errors: [{ msg: "Taki sezon nie istnieje w bazie danych." }],
        });
      }

      const seasons = [];
      seasons.push(seasonFromDB);

      // check info in history
      const historyData = await Promise.all(
        history.map(async (item) => {
          let leagueDB = await League.findOne({ name: item.league });
          if (!leagueDB) {
            return res.status(400).json({
              errors: [{ msg: "Taka liga nie istnieje w bazie danych." }],
            });
          }

          let seasonDB = await Season.findOne({ name: item.season });
          if (!seasonDB) {
            return res.status(400).json({
              errors: [{ msg: "Taki sezon nie istnieje w bazie danych." }],
            });
          }

          if (seasons.some((item) => item.id === seasonDB.id)) {
            return res.status(400).json({
              errors: [
                {
                  msg: "Jeden klub nie mógł grać dwa razy w tym samym sezonie.",
                },
              ],
            });
          }

          seasons.push(seasonDB);

          return { league: leagueDB, season: seasonDB };
        })
      );

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

        // return res.json(clubUpdate);
      }

      // Create
      club = new Club({
        name,
        logo,
        league: leagueFromDB,
        season: seasonFromDB,
        history: historyData,
      });

      // await club.save();
      res.json(club);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route     GET api/clubs
// @desc      Get all clubs
// @access    Public
router.get("/", async (req, res) => {
  try {
    const club = await Club.find().populate("league");

    if (club.length === 0) {
      return res.status(404).json({
        errors: [{ msg: "Nie ma ani jednego klubu w bazie danych." }],
      });
    }

    res.json(club);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/clubs/:clubID
// @desc      Get club by ID
// @access    Public
router.get("/:clubID", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubID }).populate(
      "league"
    );

    if (!club) {
      return res.status(404).json({
        errors: [{ msg: "Nie ma ani jednego klubu w bazie danych." }],
      });
    }

    res.json(club);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "Klubu nie znaleziono w bazie danych" }] });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
