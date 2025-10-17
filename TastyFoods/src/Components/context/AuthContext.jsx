import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Slices/LoginSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch(logoutUser());
    navigate("/login-selector", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
