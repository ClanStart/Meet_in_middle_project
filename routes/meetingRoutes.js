const express = require('express');
const router = express.Router();
const {
    createMeeting,
    getCreatedMeetings,
    getInvitedMeetings,
    getAllMeetings     // ✅ Added
} = require('../controllers/meetingController');

// Create new meeting
router.post('/create', createMeeting);

// Get meetings created by a user
router.get('/created/:phone', getCreatedMeetings);

// Get meetings a user is invited to
router.get('/invited/:phone', getInvitedMeetings);

// ✅ NEW: Get all meetings
router.get('/all', getAllMeetings);

module.exports = router;