const express = require("express");
const { getFeatures, seedFeatures } = require("../controllers/feature.controller");
const router = express.Router();

router.get("/", getFeatures);
router.post("/seed", seedFeatures);

module.exports = router;
