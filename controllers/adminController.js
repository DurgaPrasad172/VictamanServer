// adminController.js


const Tracking = require('../models/Tracking');

// Controller functions
exports.addTracking = async (req, res) => {
  const { trackingNumber, status, location } = req.body;

  try {
    // Check if the user making the request has admin privileges
    // This is a simplified example, you may need to implement proper authentication and authorization
    const isAdmin = req.user && req.user.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const tracking = new Tracking({ trackingNumber, status, location });
    await tracking.save();
    res.status(201).json({ message: 'Tracking information added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTracking = async (req, res) => {
  const { status, location } = req.body;
  const trackingNumber = req.params.trackingNumber;

  try {
    // Check if the user making the request has admin privileges
    const isAdmin = req.user && req.user.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const tracking = await Tracking.findOne({ trackingNumber });

    if (!tracking) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    tracking.status = status || tracking.status;
    tracking.location = location || tracking.location;
    await tracking.save();

    res.status(200).json({ message: 'Tracking information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTracking = async (req, res) => {
  const trackingNumber = req.params.trackingNumber;

  try {
    // Check if the user making the request has admin privileges
    const isAdmin = req.user && req.user.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized: Admin privileges required' });
    }

    const result = await Tracking.deleteOne({ trackingNumber });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    res.status(200).json({ message: 'Tracking information deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = exports;
