import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import AdminNavbar from './component/AdminNavbar';
import HomePage from './component/HomePage';
import Footer from './component/Footer';

// Admin Page Imports
import LoginPage from "./AdminPages/LoginPage";
import Dashboard from "./AdminPages/Dashboard";
import Products from "./AdminPages/Products";
import Categories from "./AdminPages/Categories";
import Orders from "./AdminPages/Orders";
import Users from "./AdminPages/Users";

// Import Auth Context and Protected Route
import { AuthProvider, useAuth } from './context/AuthContextAdmin';
import ProtectedRoute from './component/ProtectedRoute';
import ProductDetails from './component/ProductDetails';
import AdminProductDetails from './AdminPages/AdminProductDetails';
import { CartConextProvider } from './context/CartContext';
import CartPages from './ClientPages/CartPages';
import CheckoutPages from './ClientPages/CheckoutPages';
import OnefitLoader from './component/OnefitLoader';

const Tracksuit = () => (
  <h2 className="text-center mt-16">Tracksuit Category</h2>
);
const TShirt = () => <h2 className="text-center mt-16">T-shirt Category</h2>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartConextProvider>
          <div>
            <AppContent />
          </div>
        </CartConextProvider>
        <Footer />
        </Router>
      </AuthProvider>
    
  );
}

const AppContent = () => {
  const location = useLocation();
  // Loading state
  const [loading, setLoading] = useState(false);
  // Trigger loading animation on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust timeout as needed
    return () => clearTimeout(timer);
  }, [location]);

  const isAdminPath = location.pathname.startsWith('/admin');
  const { isAuthenticated } = useAuth();

  return (
    <>

      {/* Logo Loader */}
      {loading && <OnefitLoader />}
      {isAdminPath ? <AdminNavbar /> : <Navbar />}

      <Routes>
        {/* Main Routes */}
        {!isAdminPath && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/tracksuit" element={<Tracksuit />} />
            <Route path="/category/tshirt" element={<TShirt />} />
            <Route path="/cart" element={<CartPages />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPages />} />
          </>
        )}

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />}
        />

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
          path="/admin/ProductDetails/:id"
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
          path="/admin/color"
          element={
            <ProtectedRoute>
              <AddColor />
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
        <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
