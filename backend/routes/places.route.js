const express = require('express');
const router = express.Router();
const { getNearbyPlaces } = require('../controllers/places.controller');

router.get('/', getNearbyPlaces);

module.exports = router;
