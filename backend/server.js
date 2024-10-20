const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');


dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 7025;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const bcrypt = require('bcryptjs');

// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10); // generate salt
//   const hashedPassword = await bcrypt.hash(password, salt); // hash password with salt
//   console.log(hashedPassword);
// }

// // Call the function to hash the password
// hashPassword('admin123');

const bcrypt = require('bcryptjs');
const Admin = require('../backend/models/adminModel'); // Adjust the path as needed

const createAdmin = async () => {
  const email = "admin@admin.com"; // Use the same email as in the database
  const password = "admin123"; // Your desired password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();
  console.log('Admin created successfully');
};

// createAdmin();

