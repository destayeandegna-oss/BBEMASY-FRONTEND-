import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/authService';

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && !hasRole(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;