const express = require('express');
const router = express.Router();
const { askBot, getHistory } = require('../controllers/ai.controller');
const setUser = require('../middleware/setUser');

router.post('/chat', setUser, askBot);
router.get('/history', setUser, getHistory);

module.exports = router;
