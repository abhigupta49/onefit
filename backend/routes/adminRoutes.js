const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');

// Login route for admin
router.post('/login', adminLogin);

module.exports = router;
