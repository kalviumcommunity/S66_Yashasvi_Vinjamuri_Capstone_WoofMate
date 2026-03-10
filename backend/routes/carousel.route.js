const express = require("express");
const { getCarouselPhotos, seedCarouselPhotos } = require("../controllers/carousel.controller");
const router = express.Router();

router.get("/", getCarouselPhotos);
router.post("/seed", seedCarouselPhotos);

module.exports = router;
