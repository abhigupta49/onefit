import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import AdminNavbar from './component/AdminNavbar';
import HomePage from './component/HomePage';
import Footer from './component/Footer';

// Admin Page Imports
import LoginPage from './AdminPages/LoginPage';
import Dashboard from './AdminPages/Dashboard';
import Products from './AdminPages/Products';
import Categories from './AdminPages/Categories';
import Orders from './AdminPages/Orders';
import Users from './AdminPages/Users';

// Import Auth Context and Protected Route
import { AuthProvider, useAuth } from './context/AuthContextAdmin';
import ProtectedRoute from './component/ProtectedRoute';
import ProductDetails from './component/ProductDetails';
import AdminProductDetails from './AdminPages/AdminProductDetails';

const Tracksuit = () => <h2 className="text-center mt-16">Tracksuit Category</h2>;
const TShirt = () => <h2 className="text-center mt-16">T-shirt Category</h2>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AppContent />
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  return (
    <>
      {isAdminPath ? <AdminNavbar /> : <Navbar />}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/category/tracksuit" element={<Tracksuit />} />
        <Route path="/category/tshirt" element={<TShirt />} />
        {/* Dynamic route for product details */}
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />}
        /> {/* Redirect to dashboard or login */}
        
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/admin/ProductDetails/:id' 
          element={
          <ProtectedRoute>
            <AdminProductDetails />
          </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Login Route */}
        <Route 
          path="/admin/login" 
          element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <LoginPage />} 
        />
      </Routes>
    </>
  );
};

export default App;
