const express = require("express");
const router = express.Router();
const setUser = require("../middleware/setUser");
const { createRecommendations } = require("../controllers/recommendation.controller");

router.post("/", setUser, createRecommendations);

module.exports = router;
