import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {checkUserAuthentication} from '../auth/auth.ts';
const ProtectedRoute: React.FC = () => {
  const isAuthenticated = checkUserAuthentication();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;