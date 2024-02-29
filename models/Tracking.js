// Tracking.js

const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Tracking', trackingSchema);
