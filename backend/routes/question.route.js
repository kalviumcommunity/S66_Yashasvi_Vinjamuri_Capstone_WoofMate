const express = require("express");
const { getQuestions, seedQuestions } = require("../controllers/question.controller");
const router = express.Router();

router.get("/", getQuestions);
router.post("/seed", seedQuestions);

module.exports = router;
