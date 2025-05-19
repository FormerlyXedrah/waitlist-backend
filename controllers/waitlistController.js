const User = require('../models/User');

/**
 * @desc    Register a new user for waitlist
 * @route   POST /api/waitlist/register
 * @access  Public
 */
exports.registerForWaitlist = async (req, res, next) => {
  try {
    const { email, walletAddress } = req.body;
    
    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered'
      });
    }
    
    // Check if wallet address already exists
    const walletExists = await User.findOne({ walletAddress });
    if (walletExists) {
      return res.status(409).json({
        success: false,
        message: 'Wallet address is already registered'
      });
    }
    
    // Get IP address from request
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Create new user
    const user = new User({
      email,
      walletAddress,
      ipAddress
    });
    
    // Save user to database
    await user.save();
    
    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Successfully registered for the waitlist'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get waitlist statistics (e.g., total users)
 * @route   GET /api/waitlist/stats
 * @access  Public
 */
exports.getWaitlistStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    
    return res.status(200).json({
      success: true,
      data: {
        totalRegistrations: totalUsers
      }
    });
  } catch (error) {
    next(error);
  }
};