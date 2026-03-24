const express = require('express');
const router = express.Router();
const { reportRescue, getReports, updateReportStatus, seedRescues } = require('../controllers/rescue.controller');
const setUser = require('../middleware/setUser');

router.post('/', setUser, reportRescue);
router.get('/', getReports);
router.put('/:id/status', updateReportStatus);
router.post('/seed', seedRescues);

module.exports = router;
