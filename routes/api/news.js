import { Router } from "express";
import { check, validationResult } from "express-validator";

import { serverErrors, validate } from "../../const/exceptions.js";

import News from "../../models/News";

const router = Router();

// @route     POST api/news
// @desc      Add news
// @access    Public
router.post(
  "/",
  [
    check("title", validate.title).not().isEmpty(),
    check("description", validate.description).not().isEmpty(),
    check("image", validate.image).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, image } = req.body;

    try {
      // See if the News exists
      let news = await News.findOne({ title });
      if (news) {
        news = await News.findOneAndUpdate(
          { _id: news._id },
          {
            $set: {
              title,
              description,
              image,
            },
          },
          { new: true }
        );

        return res.json(news);
      }

      // Create
      news = new News({ title, description, image });

      await news.save();
      res.json(news);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverErrors.serverError);
    }
  }
);

// @route     GET api/news
// @desc      Get news
// @access    Public
router.get("/", async (req, res) => {
  try {
    const news = await News.find();

    if (news.length === 0) {
      return res.status(404).json({
        errors: [
          {
            msg: serverErrors.newsNotFound,
          },
        ],
      });
    }

    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverErrors.serverError);
  }
});

// @route     GET api/news/:newsID
// @desc      Get news by ID
// @access    Public
router.get("/:newsID", async (req, res) => {
  try {
    const news = await News.findOne({ _id: req.params.newsID });

    if (!news) {
      return res
        .status(404)
        .json({ errors: [{ msg: serverErrors.newNotFound }] });
    }

    res.json(news);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        errors: [{ msg: serverErrors.newNotFound }],
      });
    }
    res.status(500).send(serverErrors.serverError);
  }
});

export default router;
