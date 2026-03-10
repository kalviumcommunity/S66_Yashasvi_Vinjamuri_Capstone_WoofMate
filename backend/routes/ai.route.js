const express = require('express');
const router = express.Router();
const { askBot } = require('../controllers/ai.controller');

router.post('/chat', askBot);

module.exports = router;
