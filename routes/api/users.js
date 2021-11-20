const express = require("express");
const route = express.Router();

// @route       GET api/users
// @desc        Test route
// @access      Public
route.get("/", (req, res) => res.send("API Running"));

module.exports = route;
