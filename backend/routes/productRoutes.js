const express = require('express');
const router = express.Router();
const { getProducts, addProduct, editProduct, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

// Product routes
router.get('/', protect, getProducts);
router.post('/add', protect, addProduct);
router.put('/edit/:productId', protect, editProduct);
router.delete('/delete/:productId', protect, deleteProduct);

module.exports = router;
