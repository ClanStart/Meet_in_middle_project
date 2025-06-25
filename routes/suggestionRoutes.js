const express = require('express');
const router = express.Router();
const { suggestMidpoint } = require('../controllers/suggestionController');

router.get('/midpoint/:meetingId', suggestMidpoint);

module.exports = router;