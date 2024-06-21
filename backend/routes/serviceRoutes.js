const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Assuming you have some middleware for authentication

// Create a new service
router.post('/', verifyToken, verifyAdmin, createService);

// Get all services
router.get('/', verifyToken, getAllServices);

// Get a specific service by ID
router.get('/:id', verifyToken, getServiceById);

// Update a service by ID
router.put('/:id', verifyToken, verifyAdmin, updateService);

// Delete a service by ID
router.delete('/:id', verifyToken, verifyAdmin, deleteService);

module.exports = router;
