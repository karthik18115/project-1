import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  // Mock authentication check - in a real app, this would check for a valid token in localStorage or context
  const isAuthenticated = !!localStorage.getItem('authToken');
  // Mock user role - in a real app, this would be fetched from user data or context
  const userRole = localStorage.getItem('userRole') || 'patient';

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to unauthorized or home page if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute; 