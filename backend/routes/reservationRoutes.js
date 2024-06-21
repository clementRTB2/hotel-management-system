const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Assuming you have some middleware for authentication

// Create a new reservation
router.post('/', verifyToken, createReservation);

// Get all reservations
router.get('/', verifyToken, verifyAdmin, getAllReservations);

// Get a specific reservation by ID
router.get('/:id', verifyToken, getReservationById);

// Update a reservation by ID
router.put('/:id', verifyToken, updateReservation);

// Delete a reservation by ID
router.delete('/:id', verifyToken, deleteReservation);

module.exports = router;
