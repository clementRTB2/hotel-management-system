const express = require('express');
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware'); // Assuming you have some middleware for authentication

// Create a new room
router.post('/', verifyToken, verifyAdmin, createRoom);

// Get all rooms
router.get('/', verifyToken, getAllRooms);

// Get a specific room by ID
router.get('/:id', verifyToken, getRoomById);

// Update a room by ID
router.put('/:id', verifyToken, verifyAdmin, updateRoom);

// Delete a room by ID
router.delete('/:id', verifyToken, verifyAdmin, deleteRoom);

module.exports = router;
