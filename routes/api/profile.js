const express = require('express');
const router = express.Router();

// HEADER that describes the Route
// @route is a GET request to api/profile/test
// @description Test the profile route
// @access Public (All users even non-logged in)
router.get('/test', (req, res) => res.json({ msg: 'Profile Works'}));

module.exports = router;