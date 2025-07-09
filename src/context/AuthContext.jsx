import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setErrorMessage(null);
    const url = `${apiURL}/auth/signin`;
    try {
      const res = await axios.post(url, { email, password });
      const token = res.data.access_token;

      localStorage.setItem("adminToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setErrorMessage(message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
