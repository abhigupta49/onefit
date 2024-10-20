import React, { useState } from 'react';
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Dummy category data
  const categories = [
    { id: 1, name: 'Tracksuit' },
    { id: 2, name: 'T-shirt' },
    { id: 3, name: 'Shorts' },
    { id: 4, name: 'Shoes' },
  ];

  // Toggle dropdown for mobile
  const handleDropdownClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-black text-white py-4 fixed w-full top-0 z-50 px-2">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">OneFit Sports</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {/* Categories Dropdown */}
          <div 
            className="relative py-3"
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-lg flex items-center focus:outline-none">
              Men <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-black text-white mt-2 rounded shadow-md w-32 z-20">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex space-x-4 text-lg">
            <FaSearch className="cursor-pointer hover:text-gray-400" />
            <FaUserAlt className="cursor-pointer hover:text-gray-400" />
            <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl focus:outline-none">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white p-4">
          {/* Categories Dropdown */}
          <div className="mb-4">
            <button
              onClick={handleDropdownClick}
              className="w-full flex justify-between items-center px-4 py-2 text-lg focus:outline-none"
            >
              Categories <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="bg-black text-white mt-2 rounded shadow-md w-full">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                    onClick={() => setMobileMenuOpen(false)} // Close after click
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex space-x-4 text-lg">
            <FaSearch className="cursor-pointer hover:text-gray-400" />
            <FaUserAlt className="cursor-pointer hover:text-gray-400" />
            <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
