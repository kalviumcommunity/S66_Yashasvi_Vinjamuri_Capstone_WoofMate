const express = require('express');
const router = express.Router();
const { reportRescue, getReports, updateReportStatus, seedRescues } = require('../controllers/rescue.controller');
const setUser = require('../middleware/setUser');

router.post('/', setUser, reportRescue);
router.get('/', getReports);
router.put('/:id/status', updateReportStatus);
router.post('/seed', seedRescues);

// Fetch rescues for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        // inline logic for brevity since it's just a simple read
        const Rescue = require('../models/rescue.model');
        const rescues = await Rescue.find({ reporter: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(rescues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
