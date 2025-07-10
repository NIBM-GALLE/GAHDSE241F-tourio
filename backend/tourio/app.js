const express = require('express');
const cors = require('cors');

// Routes
const tourRoutes = require('./src/routes/tourRoutes');
const hotelRoutes = require('./src/routes/hotelRoutes');
const tourRequestRoutes = require('./src/routes/tourRequestRoutes');
const authRoutes = require('./src/routes/auth');
const stripeRoutes = require('./src/routes/stripeRoutes');
const addTourRequestRoutes = require('./src/routes/addTourRequestRoutes');
const dialogflowRoutes = require('./src/routes/dialogflowRoutes');
const tourFeedbackRoutes = require('./src/routes/tourFeedbackRoutes');
const getTourFeedbackRoutes = require('./src/routes/getTourFeedbackRoutes')
const tourProposalRoutes = require('./src/routes/tourProposalRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/tours', tourRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/tourreq', tourRequestRoutes);
app.use('/api', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/addtourrequest', addTourRequestRoutes);
app.use('/api/dialogflow', dialogflowRoutes);
app.use('/api/tourfeedback', tourFeedbackRoutes);
app.use('/api/gettourfeedbacks', getTourFeedbackRoutes);
app.use('/api/createtourproposal', tourProposalRoutes);

module.exports = app;
