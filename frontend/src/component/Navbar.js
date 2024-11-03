import React, { useState } from 'react';
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login
  const {cart} = useCart()
  const navigate = useNavigate();

  console.log(cart)
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

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setDropdownOpen(!isDropdownOpen); // Toggle profile dropdown
    } else {
      navigate('/signup'); // Redirect to login page
      setIsLoggedIn(true); // Set login state
    }
  };

  return (
    <nav className="bg-white text-black shadow-md py-4 fixed w-full top-0 z-50 px-8">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        {/* <div className="text-2xl font-bold">
          <Link to="/">OneFit Sports</Link>
        </div> */}

            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex flex-col items-center">
                <div className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <span style={{ color: '#4CAF50' }}>O</span>
                  <span style={{ color: '#E91E63' }}>N</span>
                  <span style={{ color: '#2196F3' }}>E</span>
                  <span style={{ color: '#9C27B0' }}>F</span>
                  <span style={{ color: '#00BCD4' }}>I</span>
                  <span style={{ color: '#FF4081' }}>T</span>
                </div>
                <div className="text-sm font-bold text-gray-600 -mt-1">SPORTS</div>
              </Link>
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
            <div className="relative">
              {isLoggedIn ? (
                <FaUserAlt onClick={handleLoginClick} className="cursor-pointer hover:text-gray-400" />
              ) : (
                <FaSignInAlt onClick={handleLoginClick} className="cursor-pointer hover:text-gray-400" />
              )}
              {isLoggedIn && isDropdownOpen && (
                <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-md w-32 z-20">
                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-200">My Orders</Link>
                  <Link to="/my-address" className="block px-4 py-2 hover:bg-gray-200">My Address</Link>
                </div>
              )}
            </div>
            <Link to={`/cart`}>
              <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
              {cart.length > 0 && (
                <span className="absolute top-6 right-5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
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
            {isLoggedIn ? (
              <FaUserAlt onClick={handleLoginClick} className="cursor-pointer hover:text-gray-400" />
            ) : (
              <FaSignInAlt onClick={handleLoginClick} className="cursor-pointer hover:text-gray-400" />
            )}
            <div className="relative">
              <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
