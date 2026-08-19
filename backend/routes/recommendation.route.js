const express = require('express');
const { createRecommendations } = require('../controllers/recommendation.controller');
const setUser = require('../middleware/setUser');

const router = express.Router();

router.post('/', setUser, createRecommendations);

module.exports = router;
