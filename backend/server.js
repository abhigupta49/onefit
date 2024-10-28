const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors

const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const colorRoutes = require("./routes/colorRoutes");

dotenv.config();

const app = express();
connectDB();

// Enable CORS for all routes
app.use(
  cors({
    origin: ["http://localhost:3000", "http://yourfrontenddomain.com"], // Replace with your frontend domains
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/category", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/color", colorRoutes);

// Start server
const PORT = process.env.PORT || 7025;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
