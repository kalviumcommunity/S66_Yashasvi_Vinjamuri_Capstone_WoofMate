const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/adoption.model');
const authenticate = require('../middleware/authenticate');

// Get all adoption requests (Admin only ideally, but we will protect the frontend instead for now)
router.get('/all', authenticate, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate("user", "name email")
      .populate("dog", "name breed location images")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get adoptions for a specific user
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ user: req.params.userId })
      .populate("dog", "name breed location images")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update adoption status
router.put('/:id/status', authenticate, async (req, res) => {
    try {
        const { status } = req.body;
        const request = await AdoptionRequest.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
