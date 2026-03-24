const express = require('express');
const router = express.Router();
const { getAllGuides, getGuidesByCategory, createGuide, seedGuides } = require('../controllers/guide.controller');

router.get('/', getAllGuides);
router.get('/category/:category', getGuidesByCategory);
router.post('/', createGuide);
router.post('/seed', seedGuides);

module.exports = router;
