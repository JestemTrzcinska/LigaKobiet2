import { Router } from "express";
import { body, validationResult } from "express-validator";
import { serverErrors, validate } from "../../const/exceptions.js";

import auth from "../../middleware/auth.js";

import Game from "../../models/Game.js";
import Club from "../../models/Club.js";
import League from "../../models/League.js";
import Season from "../../models/Season.js";
import Player from "../../models/Player.js";

const router = Router();

// @route     POST api/games
// @desc      Add game
// @access    Public
router.post(
  "/",
  [
    body("home", validate.gameHome).not().isEmpty(),
    body("away", validate.gameAway).not().isEmpty().withMessage(),
    body("league", validate.leagueName).not().isEmpty(),
    body("season", validate.seasonName).not().isEmpty(),
    body("date", validate.gameDate).not().isEmpty(),
    body("round")
      .not()
      .isEmpty()
      .withMessage(validate.gameRound)
      .isInt({ min: 1 })
      .withMessage(validate.gameRoundMin),
    body("goals.*.amount")
      .not()
      .isEmpty()
      .withMessage(validate.gameGoalAmount)
      .isInt({ min: 1 })
      .withMessage(validate.gameGoalAmountMin),
    body("goals.*.shotBy", validate.gameShotBy).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { home, away, league, season, date, isFinished, round, goals } =
      req.body;

    try {
      // See if team home exists
      const homeFromDB = await Club.findOne({
        name: home,
      });
      if (!homeFromDB) {
        return res.status(404).json({
          errors: [{ msg: serverErrors.clubNotFound }],
        });
      }

      // See if team away exists
      const awayFromDB = await Club.findOne({
        name: away,
      });
      if (!awayFromDB) {
        return res.status(404).json({
          errors: [{ msg: serverErrors.clubNotFound }],
        });
      }

      // See if teams are not the same
      if (homeFromDB.id === awayFromDB.id) {
        return res.status(400).json({
          errors: [{ msg: serverErrors.invalidGameTeams }],
        });
      }

      // See if league exists
      const leagueFromDB = await League.findOne({
        name: league,
      });
      if (!leagueFromDB) {
        return res.status(404).json({
          errors: [{ msg: serverErrors.leagueNotFound }],
        });
      }

      // See if season exists
      const seasonFromDB = await Season.findOne({
        name: season,
      });
      if (!seasonFromDB) {
        return res.status(404).json({
          errors: [{ msg: serverErrors.seasonNotFound }],
        });
      }

      // Build gameFields object
      const gameFields = {};

      gameFields.home = homeFromDB;
      gameFields.away = awayFromDB;
      gameFields.league = leagueFromDB;
      gameFields.season = seasonFromDB;
      gameFields.round = round;
      if (isFinished) gameFields.isFinished = isFinished;

      // Check if game is in time that season is
      if (
        new Date(date) > seasonFromDB.from &&
        new Date(date) < seasonFromDB.to
      ) {
        gameFields.date = date;
      } else {
        return res.status(400).json({
          errors: [{ msg: serverErrors.invalidGameDate }],
        });
      }

      if (goals) {
        gameFields.goals = [];

        goals.forEach(async (item) => {
          const playerFromDB = await Player.findOne({
            _id: item.shotBy,
          });
          if (!playerFromDB) {
            return res.status(404).json({
              errors: [{ msg: serverErrors.playerNotFound }],
            });
          }

          gameFields.goals.push({
            amount: item.amount,
            goalForTeamHome: item.goalForTeamHome,
            shotBy: playerFromDB,
          });
        });
      }

      let game = await Game.findOne({
        home: homeFromDB,
        away: awayFromDB,
        league: leagueFromDB,
        season: seasonFromDB,
      });

      if (game) {
        // Update
        game = await Game.findOneAndUpdate(
          { _id: game._id },
          { $set: gameFields },
          { new: true }
        )
          .populate("home")
          .populate("away")
          .populate("league")
          .populate("season")
          .populate("goals.shotBy");

        return res.json(game);
      }

      // Create
      game = new Game(gameFields);

      await game.save();
      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverErrors.serverError);
    }
  }
);

// @route     GET api/games
// @desc      Get all games
// @access    Public
router.get("/", async (req, res) => {
  try {
    const game = await Game.find()
      .sort({ date: -1 })
      .populate("home")
      .populate("away")
      .populate("league")
      .populate("season")
      .populate("goals.shotBy");
    if (game.length === 0) {
      return res.status(404).json({
        errors: [{ msg: serverErrors.gamesNotFound }],
      });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverErrors.serverError);
  }
});

// @route     GET api/games/:gameID
// @desc      Get game by game ID
// @access    Public
router.get("/:gameID", async (req, res) => {
  try {
    const game = await Game.findOne({
      _id: req.params.gameID,
    })
      .populate("home")
      .populate("away")
      .populate("league")
      .populate("season")
      .populate("goals.shotBy");
    if (!game) {
      return res.status(404).json({
        errors: [{ msg: serverErrors.gameNotFound }],
      });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: serverErrors.gameNotFound }],
      });
    }
    res.status(500).send(serverErrors.serverError);
  }
});

// @route     GET api/games/:gameID/players
// @desc      Get players in the game by game ID
// @access    Public
router.get("/:gameID/players", async (req, res) => {
  try {
    const game = await Game.findOne({
      _id: req.params.gameID,
    })
      .populate("home")
      .populate("away")
      .populate("league")
      .populate("season")
      .populate("goals.shotBy");
    if (!game) {
      return res.status(404).json({
        errors: [{ msg: serverErrors.gameNotFound }],
      });
    }

    const { home, away, league, season } = game;

    const playersAway = await Player.aggregate([
      {
        $unwind: "$clubs",
      },
      {
        $match: {
          "clubs.league": league,
          "clubs.season": season,
          "clubs.club": away,
        },
      },
    ]);

    const playersHome = await Player.aggregate([
      {
        $unwind: "$clubs",
      },
      {
        $match: {
          "clubs.league": league,
          "clubs.season": season,
          "clubs.club": home,
        },
      },
    ]);

    res.json({ playersHome, playersAway });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: serverErrors.gameNotFound }],
      });
    }
    res.status(500).send(serverErrors.serverError);
  }
});

export default router;
