import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API_BASE_URL from "../config/api";
import { clearSessionToken, isLoggedIn } from "../utils/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn()) {
        try {
          const response = await axios.get(`${API_BASE_URL}/profile`, {
            withCredentials: true,
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      Cookies.remove("token");
      clearSessionToken();
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
