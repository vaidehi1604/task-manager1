import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_ACCESS_TOKEN_KEY } from "../appConstants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem(USER_ACCESS_TOKEN_KEY)
  );

  useEffect(() => {
    if (isAuthenticated && !user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
      // Mock fallback if no stored user
      else
        setUser({ name: "Demo User", email: "demo@example.com", role: "user" });
    }
  }, [isAuthenticated, user]);

  const isAdmin = user?.role === "admin";

  const login = (token, userData) => {
    localStorage.setItem(USER_ACCESS_TOKEN_KEY, token);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
    localStorage.setItem("theme", "light");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
