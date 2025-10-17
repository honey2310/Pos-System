import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";
import React from "react";

// roles = array of allowed roles e.g. ["employee"], ["manager"]
const PrivateRoute = ({ children, roles }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />; // not logged in
  }

  if (roles && !roles.includes(role)) {
    // user logged in but not allowed role
    return <Navigate to="/login" />; 
  }

  return children;
};

export default PrivateRoute;
