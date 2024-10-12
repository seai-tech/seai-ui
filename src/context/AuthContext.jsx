import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, check if the user is already authenticated
    const storedUserId = localStorage.getItem('userId');
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedEmail = localStorage.getItem('email');

    if (storedUserId && storedAccessToken && storedEmail) {
      setUserId(storedUserId);
      setAccessToken(storedAccessToken);
      setEmail(storedEmail);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (newUserId, newAccessToken, newEmail) => {
    localStorage.setItem('userId', newUserId);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('email', newEmail);
    setUserId(newUserId);
    setAccessToken(newAccessToken);
    setEmail(newEmail);
    setIsAuthenticated(true);
    navigate('/crew-menu');
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    setUserId(null);
    setAccessToken(null);
    setEmail(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ userId, accessToken, email, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
