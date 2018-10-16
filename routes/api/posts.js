const express = require('express');
const router = express.Router();

// HEADER that describes the Route
// @route is a GET request to api/posts/test
// @description Test the posts route
// @access Public (All users even non-logged in)
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

module.exports = router;