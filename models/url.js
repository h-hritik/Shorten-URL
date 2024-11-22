// models/url.js
const mongoose = require('mongoose');

const visitHistorySchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
});

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: {
    type: [visitHistorySchema],
    required: true,
  },
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
