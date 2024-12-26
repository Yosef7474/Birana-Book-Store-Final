import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); // Named export

export const AuthProvider = ({ children }) => { // Named export
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
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
    localStorage.setItem("token", token);
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    const payloadObject = JSON.parse(decodedPayload);
    setUser(payloadObject);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
