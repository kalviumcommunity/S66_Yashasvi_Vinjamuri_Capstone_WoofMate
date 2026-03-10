const express = require('express');
const router = express.Router();
const { createCheckoutSession, verifyPayment, getDonations, seedDonations } = require('../controllers/donation.controller');

router.post('/create-checkout-session', createCheckoutSession);
router.post('/verify', verifyPayment);
router.post('/seed', seedDonations);
router.get('/', getDonations);

module.exports = router;
