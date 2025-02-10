import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const AdminRoute = ({ children }) => {
  // Fetch the token from cookies
  const token = Cookies.get('token'); // Use Cookies.get() to retrieve the token

  const decodeToken = (token) => {
    try {
      const base64Payload = token.split('.')[1]; // Extract payload
      const decodedPayload = atob(base64Payload); // Decode Base64
      return JSON.parse(decodedPayload); // Parse to JSON
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  };

  // If no token is found, redirect to the Admin login page
  if (!token) {
    return <Navigate to="/Admin" />;
  }

  try {
    const decodedToken = decodeToken(token);

    // Check the role in the decoded token
    if (decodedToken.role !== 'admin') {
      return <Navigate to="/Admin" />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/Admin" />;
  }

  // Render the children or the Outlet if no children are provided
  return children ? children : <Outlet />;
};

export default AdminRoute;