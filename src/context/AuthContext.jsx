import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, check if the user is already authenticated
    const storedUserId = localStorage.getItem('userId');
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedEmail = localStorage.getItem('email');
    const storedUserType = localStorage.getItem('userType'); // Get the stored userType

    if (storedUserId && storedAccessToken && storedEmail && storedUserType) {
      setUserId(storedUserId);
      setAccessToken(storedAccessToken);
      setEmail(storedEmail);
      setUserType(storedUserType);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (newId, newAccessToken, newEmail, type) => {
    localStorage.setItem('userId', newId);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('email', newEmail);
    localStorage.setItem('userType', type);
    setUserId(newId);
    setAccessToken(newAccessToken);
    setEmail(newEmail);
    setUserType(type);
    setIsAuthenticated(true);
  };

  const logout = () => {
    const previousUserType = localStorage.getItem('userType');

    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');

    setUserId(null);
    setAccessToken(null);
    setEmail(null);
    setUserType(null);
    setIsAuthenticated(false);

    if (previousUserType === 'trainingCenter') {
      navigate('/login/training-center');
    } else {
      navigate('/login/user');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ userId, accessToken, email, isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
