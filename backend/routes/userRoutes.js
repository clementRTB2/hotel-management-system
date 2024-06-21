const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Assuming you have some middleware for authentication

// Create a new user
router.post('/', verifyToken, verifyAdmin, createUser);

// Get all users
router.get('/', verifyToken, verifyAdmin, getAllUsers);

// Get a specific user by ID
router.get('/:id', verifyToken, verifyAdmin, getUserById);

// Update a user by ID
router.put('/:id', verifyToken, verifyAdmin, updateUser);

// Delete a user by ID
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
