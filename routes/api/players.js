import { Router } from "express";
import { check, validationResult } from "express-validator";

import Player from "../../models/Player.js";
import League from "../../models/League.js";
import Season from "../../models/Season.js";
import Club from "../../models/Club.js";

const router = Router();

// @route     POST api/players
// @desc      Add player
// @access    Public
router.post(
  "/",
  [
    check("firstName", "Imię zawodniczki jest wymagane.").not().isEmpty(),
    check("lastName", "Nazwisko zawodniczki jest wymagane.").not().isEmpty(),
    check(
      "club",
      "Podanie paru informacji o aktualnym klubie zawodniczki jest wymagane."
    )
      .not()
      .isEmpty(),
    check(
      "club.league",
      "Podanie informacji o aktualnej lidze zawodniczki jest wymagane."
    )
      .not()
      .isEmpty(),
    check(
      "club.season",
      "Podanie informacji o aktualnym sezonie zawodniczki jest wymagane."
    )
      .not()
      .isEmpty(),
    check(
      "club.club",
      "Podanie informacji o aktualnym klubie zawodniczki jest wymagane."
    )
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      firstName,
      lastName,
      name,
      picture,
      birth,
      club: { league, season, club },
      history,
    } = req.body;

    // String in the right way - first letter is upper case, others are lower case
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    // return res.status(500).json({errors: [{msg: ''}]})

    try {
      const leagueFromDB = await League.findOne({ name: league });
      if (!leagueFromDB) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Taka liga nie istnieje." }] });
      }

      const seasonFromDB = await Season.findOne({ name: season });
      if (!seasonFromDB) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Taki sezon nie istnieje." }] });
      }

      const clubFromDB = await Club.findOne({ name: club });
      if (!clubFromDB) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Taki klub nie istnieje." }] });
      }

      const seasonsAndClubs = [];
      seasonsAndClubs.push({ season: seasonFromDB, club: clubFromDB });
      let historyData;

      if (history?.length > 0) {
        historyData = await Promise.all(
          history.map(async (item) => {
            const leagueFromDB = await League.findOne({ name: item.league });
            if (!leagueFromDB) {
              return res
                .status(500)
                .json({ errors: [{ msg: "Taka liga nie istnieje." }] });
            }

            const seasonFromDB = await Season.findOne({ name: item.season });
            if (!seasonFromDB) {
              return res
                .status(500)
                .json({ errors: [{ msg: "Taki sezon nie istnieje." }] });
            }

            const clubFromDB = await Club.findOne({ name: item.club });
            if (!clubFromDB) {
              return res
                .status(500)
                .json({ errors: [{ msg: "Taki klub nie istnieje." }] });
            }

            if (
              seasonsAndClubs.some(
                (item) =>
                  item.season.id === seasonFromDB.id &&
                  item.club.id === clubFromDB.id
              )
            ) {
              return res.status(400).json({
                errors: [
                  {
                    msg: "Jedna zawodniczka nie mógła grać dwa razy w tym samym sezonie w tej samej lidze.",
                  },
                ],
              });
            }

            seasonsAndClubs.push({ season: seasonFromDB, club: clubFromDB });

            return {
              league: leagueFromDB,
              season: seasonFromDB,
              club: clubFromDB,
            };
          })
        );
      }

      let player = await Player.findOne({
        firstName,
        lastName,
        club: {
          club: clubFromDB,
        },
      });

      if (player) {
        // Update
        player = await Player.findOneAndUpdate(
          {
            _id: player._id,
          },
          {
            $set: {
              firstName,
              lastName,
              name,
              picture,
              birth,
              club: {
                league: leagueFromDB,
                season: seasonFromDB,
                club: clubFromDB,
              },
              history: historyData,
            },
          },
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
        club: { league: leagueFromDB, season: seasonFromDB, club: clubFromDB },
        history: historyData,
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
    const player = await Player.find()
      .populate("history.league")
      .populate("history.season")
      .populate("history.club");
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
    const player = await Player.findOne({ _id: req.params.playerID })
      .populate("history.league")
      .populate("history.season")
      .populate("history.club");

    if (!player) {
      return res.status(404).json({
        errors: [
          { msg: "Zawodniczki o takim id nie znaleziono w bazie danych" },
        ],
      });
    }

    res.json(player);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        errors: [
          { msg: "Zawodniczki o takim id nie znaleziono w bazie danych" },
        ],
      });
    }
    res.status(500).send("Server Error");
  }
});

export default router;
