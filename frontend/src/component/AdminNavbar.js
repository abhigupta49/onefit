// src/component/AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
  const {logout} = useAuth();
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () =>{
    logout();
    navigate('/admin/login')
  }
  return (
    <nav className="bg-black text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/admin/dashboard">OneFit Admin</Link>
        </div>
        <div className="space-x-4">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/categories">Categories</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
          {isAuthenticated && <button
          type="submit"
          className=" bg-white text-black p-2 rounded hover:bg-blue-700" onClick={handleLogout}
          >
          Logout
        </button>}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
