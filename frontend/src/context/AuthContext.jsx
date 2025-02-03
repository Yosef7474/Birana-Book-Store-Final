import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

export const AuthContext = createContext(); // Named export

export const AuthProvider = ({ children }) => { // Named export
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch token from cookies
    const token = Cookies.get("token");
    if (token) {
      try {
        // Decode the token payload
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = atob(payloadBase64);
        const payloadObject = JSON.parse(decodedPayload);
        setUser(payloadObject);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []);

  const login = (token) => {
    // Save token in cookies with an expiration time (e.g., 1 hour)
    Cookies.set("token", token, { expires: 1 / 24 }); // 1/24 = 1 hour

    // Decode the token payload and set the user
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    const payloadObject = JSON.parse(decodedPayload);
    setUser(payloadObject);
  };

  const logout = () => {
    // Remove token from cookies
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};