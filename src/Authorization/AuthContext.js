import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize isAuthenticated from sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem('isAuthenticated')) || false
  );

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true'); // Storing the authentication state as a string
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated'); // Clearing the authentication state on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
