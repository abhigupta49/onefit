import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null); // To track which product is being edited

  // Dummy product data
  useEffect(() => {
    setProducts([
      { id: 1, name: 'Track Suit', category: 'Clothing', price: 2000, stock: 10, images: [] },
      { id: 2, name: 'T-Shirt', category: 'Clothing', price: 800, stock: 20, images: [] },
      { id: 3, name: 'Sneakers', category: 'Footwear', price: 3500, stock: 15, images: [] }
    ]);

    // Fetch categories from Categories.js (you can replace this with an API call)
    setCategories(['Clothing', 'Footwear', 'Accessories']); // This should be synced with Categories.js
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setNewProduct({ ...newProduct, images: [...newProduct.images, ...files] });
    setImagePreviews([...imagePreviews, ...previews]);
  };

  // Remove an image
  const handleRemoveImage = (index) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setNewProduct({ ...newProduct, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  // Add or update product
  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: editingProductId ? editingProductId : products.length + 1,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    };

    if (editingProductId) {
      // Update existing product
      setProducts(products.map((p) => (p.id === editingProductId ? product : p)));
      setEditingProductId(null); // Reset editing state
    } else {
      // Add new product
      setProducts([...products, product]);
    }
    resetForm(); // Reset form after add/update
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // Edit product
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setImagePreviews(product.images.map((image) => URL.createObjectURL(image))); // Set previews for existing images
    setEditingProductId(product.id); // Set the product ID to be edited
  };

  // Reset the form
  const resetForm = () => {
    setNewProduct({ name: '', category: '', price: '', stock: '', images: [] });
    setImagePreviews([]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Images</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  {product.images.length > 0 ? (
                    product.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={product.name}
                        className="w-12 h-12 object-cover inline-block mr-2"
                      />
                    ))
                  ) : (
                    <span>No Images</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditProduct(product)} // Set the product for editing
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleAddOrUpdateProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full border-gray-300 rounded-lg p-2"
            />
            <div className="mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative inline-block mr-2">
                  <img src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full hover:bg-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Products;
