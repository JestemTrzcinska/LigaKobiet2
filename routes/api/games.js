import { Router } from "express";

const route = Router();

// @route       GET api/games
// @desc        Test route
// @access      Public
route.get("/", (req, res) => res.send("API Running"));

export default route;
