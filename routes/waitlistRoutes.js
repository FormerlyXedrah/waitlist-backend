const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitlistController');
const { validateWaitlistEntry } = require('../validators/waitlistValidator');
const rateLimiter = require('../middleware/rateLimiter');

// Route to register for waitlist
router.post(
  '/register', 
  rateLimiter,            // Apply rate limiting
  validateWaitlistEntry,  // Validate request body
  waitlistController.registerForWaitlist
);

// Route to get waitlist statistics
router.get('/stats', waitlistController.getWaitlistStats);

module.exports = router;