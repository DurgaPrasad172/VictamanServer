const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateUser = require('../middleware/authMiddleware');

// Routes with authentication middleware
router.post('/add', authenticateUser, adminController.addTracking);
router.put('/update/:trackingNumber', authenticateUser, adminController.updateTracking);
router.delete('/delete/:trackingNumber', authenticateUser, adminController.deleteTracking);

module.exports = router;
