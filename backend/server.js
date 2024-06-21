const express = require('express');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const roomRoutes = require('./routes/roomRoutes')
const reservationRoutes = require('./routes/reservationRoutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/rooms', roomRoutes);
app.use('/reservations', reservationRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

