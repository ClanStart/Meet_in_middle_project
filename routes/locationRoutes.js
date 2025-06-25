const express = require('express');
const router = express.Router();
const {
    shareLocation,
    getAllLocations
} = require('../controllers/locationController');

// ✅ POST: Share location
router.post('/share', shareLocation);

// ✅ GET: Get all locations for a meeting
router.get('/:meetingId', getAllLocations);

module.exports = router;