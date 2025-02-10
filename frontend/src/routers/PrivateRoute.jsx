import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token"); // Fetch token from cookies

  if (!token) {
    return <Navigate to="/api/users/login" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
