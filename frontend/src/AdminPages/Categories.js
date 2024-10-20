import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Dummy data to simulate initial categories
  useEffect(() => {
    setCategories(['Clothing', 'Footwear', 'Accessories']);
  }, []);

  // Add a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;

    setCategories([...categories, newCategory]);
    setNewCategory(''); // Clear input
  };

  // Delete a category
  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Category Management</h1>

      {/* Categories List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Category Name</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="p-4">{category}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteCategory(category)}
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

      {/* Add New Category Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Categories;
