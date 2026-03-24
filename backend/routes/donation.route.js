const express = require('express');
const router = express.Router();
const { recordSuccess, getDonations } = require('../controllers/donation.controller');
const setUser = require('../middleware/setUser');

router.post('/record-success', setUser, recordSuccess);
router.get('/', getDonations);

module.exports = router;
