const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    trim: true,
    unique: true,
    match: [
      /^0x[a-fA-F0-9]{40}$/,
      'Please provide a valid Ethereum wallet address',
    ],
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    trim: true,
  },
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;