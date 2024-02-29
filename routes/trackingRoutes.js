// trackingRoutes.js

const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController.js');

// Routes
router.post('/', trackingController.createTracking);
router.get('/:trackingNumber', trackingController.getTrackingInfo);

module.exports = router;
