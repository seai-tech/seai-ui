import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, userType, loading } = useContext(AuthContext);

  console.log('userType:', userType);
  console.log('required role:', role);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/user" />;
  }

  if (role && userType !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;