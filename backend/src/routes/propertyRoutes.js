const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const verifyToken = require('../middleware/authMiddleware');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', verifyToken, upload.single('image'), createProperty);
router.put('/:id', verifyToken, updateProperty);
router.delete('/:id', verifyToken, deleteProperty);

module.exports = router;