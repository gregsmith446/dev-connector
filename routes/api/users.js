const express = require('express');
const router = express.Router();

// HEADER that describes the Route
// @route is a GET request to api/users/test
// @description Test the users route
// @access Public (All users even non-logged in)
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;