const express = require("express");
const { getClicks } = require("../controllers/urlStats");
const router = express.Router();

router.get("/", getClicks);

module.exports = router;
