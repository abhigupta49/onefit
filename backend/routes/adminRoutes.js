const express = require("express");
const router = express.Router();
const { adminLogin, adminRegister } = require("../controllers/adminController");

// Login route and register for admin
router.post("/register", adminRegister);
router.post("/login", adminLogin);

module.exports = router;
