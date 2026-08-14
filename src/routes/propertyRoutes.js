const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
} = require('../controllers/propertyController');

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', verifyToken, createProperty);

module.exports = router;