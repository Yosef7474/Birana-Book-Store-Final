import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
// import jwtDecode from "jwt-decode";
// import { decode } from "jwt-decode";




const AdminRoute = ({children}) => {
  const token = localStorage.getItem('token');
  const decodeToken = (token) => {
    try {
      const base64Payload = token.split(".")[1]; // Extract payload
      const decodedPayload = atob(base64Payload); // Decode Base64
      return JSON.parse(decodedPayload); // Parse to JSON
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  };
  if(!token) {
    return <Navigate to="/Admin"/>
  }
  try {
    const decodedToken = decodeToken(token);

    // Check the role in the decoded token
    if (decodedToken.role !== "admin") {
      return <Navigate to="/Admin" />;
    }
  }catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/Admin" />;
  }
  return children ? children : <Outlet/>
}

export default AdminRoute

