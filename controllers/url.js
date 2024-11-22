const { nanoid } = require('nanoid');
const URL = require('../models/url'); // Ensure the correct path

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  try {
    const result = await URL.findOne({ shortId });
    if (result) {
      return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
      });
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGenerateNewURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: 'URL is required' });

  const shortID = nanoid(8);
  try {
    console.log("Creating new URL entry with shortID:", shortID);
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
    console.log("URL entry created successfully");
    
    // Fetch all URLs to display them on the homepage
    const allUrls = await URL.find({});
    return res.render('Homepage', { id: shortID, urls: allUrls });
  } catch (error) {
    console.error("Error creating URL entry:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  handleGenerateNewURL,
  handleGetAnalytics
};
