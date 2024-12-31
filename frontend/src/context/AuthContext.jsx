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

  const updateProfile = async (newProfileData) => {
    // Hash the password if provided
    let hashedPassword = newProfileData.password;
    if (hashedPassword) {
      hashedPassword = await bcrypt.hash(hashedPassword, 10); // Hash the password with a salt
    }

    setUser((prevUser) => {
      const updatedUser = { 
        ...prevUser, 
        ...newProfileData, 
        password: hashedPassword || prevUser.password // Update the password with the hashed value if it exists
      };

      // Optionally, update the token in localStorage with the new profile data
      const updatedPayloadBase64 = btoa(JSON.stringify(updatedUser));
      const updatedToken = `${updatedPayloadBase64}.${localStorage.getItem("token").split(".")[2]}`;
      localStorage.setItem("token", updatedToken);

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
