// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create an Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for authentication state on initialization
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Store in localStorage
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
