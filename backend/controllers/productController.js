const Product = require('../models/productModel');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, price, category, images } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      images,
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Edit product
const editProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, category, images } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      category,
      images,
    }, { new: true });
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = { getProducts, addProduct, editProduct, deleteProduct };
