const express = require("express");
const { getTestimonials, seedTestimonials } = require("../controllers/testimonial.controller");
const router = express.Router();

router.get("/", getTestimonials);
router.post("/seed", seedTestimonials);

module.exports = router;
