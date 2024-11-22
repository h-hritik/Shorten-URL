const express = require('express');
const router = express.Router();
const { handleGenerateNewURL,handleGetAnalytics} = require('../controllers/url'); // Ensure correct path

// Define route for generating new short URL
router.post('/', handleGenerateNewURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;
