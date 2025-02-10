import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookie
    if (token) {
      try {
        // Decode the JWT token
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode base64 payload
        setUser(decodedPayload); // Set user information from decoded token
      } catch (err) {
        console.error("Error decoding token:", err);
        Cookies.remove("token"); // Remove invalid token from cookie
        setUser(null);
      }
    }
  }, []); // Run only on initial load

  const login = (token) => {
    Cookies.set("token", token, { expires: 1 / 24 }); // Store token in cookie with expiration time

    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode base64 payload
      setUser(decodedPayload); // Set user information from decoded token
    } catch (err) {
      console.error("Error decoding token:", err);
      setUser(null);
    }
  };

  const logout = () => {
    Cookies.remove("token"); // Remove token from cookie
    setUser(null); // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
