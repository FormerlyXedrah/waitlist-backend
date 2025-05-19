const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const waitlistRoutes = require('./routes/waitlistRoutes');
const errorHandler = require('./middleware/errorHandler');
const dbConfig = require('./config/db');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConfig.connect();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON request body

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Waitlist API is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});