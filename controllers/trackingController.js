// trackingController.js

const Tracking = require('../models/Tracking')

// Controller functions
exports.createTracking = async (req, res) => {
  try {
    const { trackingNumber, status, location } = req.body;
    const tracking = new Tracking({ trackingNumber, status, location });
    await tracking.save();
    res.status(201).json({ message: 'Tracking information created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getTrackingInfo = async (req, res) => {
  const trackingNumber = req.params.trackingNumber;

  try {
    const trackingInfo = await Tracking.findOne({ trackingNumber });

    if (!trackingInfo) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    res.status(200).json(trackingInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
