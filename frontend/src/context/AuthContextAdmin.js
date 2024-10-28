import React, { createContext, useContext, useState, useEffect } from "react";
import Helpers from "../Helper/Helpers";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

// Create an Auth Context
const AuthContextAdmin = createContext();

export const useAuth = () => useContext(AuthContextAdmin);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Check localStorage for authentication state on initialization
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    let data = {
      email: credentials?.username,
      password: credentials?.password,
    };

    try {
      const res = await Helpers("/login", "POST", data);
      if (res && res?.status) {
        setIsAuthenticated(true);
        // setToken(res?.token);
        localStorage.setItem("token", res?.token);
        localStorage.setItem("isAuthenticated", "true");
        swal("Login", res?.msg, "success");
        navigate("/admin/dashboard");
      } else {
        swal("Login Failed!", "Admin not found.!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    // setToken("");
    navigate("/");
  };

  return (
    <AuthContextAdmin.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContextAdmin.Provider>
  );
};
