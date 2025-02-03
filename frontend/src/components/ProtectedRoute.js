import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;