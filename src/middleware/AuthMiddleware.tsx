import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../feature/AuthContext';

export interface ReactNodeProps {
  children: React.ReactNode;
}

export const AuthMiddleware: React.FC<ReactNodeProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  return <>{children}</>;
};
