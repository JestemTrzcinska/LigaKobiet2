const express = require("express");
const route = express.Router();

// @route       GET api/profile
// @desc        Test route
// @access      Public
route.get("/", (req, res) => res.send("API Running"));

module.exports = route;
