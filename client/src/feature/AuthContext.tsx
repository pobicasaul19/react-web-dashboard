/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { AuthUser } from '../models/User';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (auth: unknown) => void;
  logout: () => void;
  getAuth: AuthUser
}
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authValue, setAuthValue] = useState<string | null>(() => localStorage.getItem('auth'));
  const isAuthenticated = !!authValue;
  const theme = useTheme();

  const login = (auth: unknown) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuthValue(JSON.stringify(auth));
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuthValue(null);
  };

  const getAuth = authValue ? JSON.parse(authValue) : null;

  return (
    <AppProvider theme={theme}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout, getAuth }}>
        {children}
      </AuthContext.Provider>
    </AppProvider>
  );
};

export const getAuth = () => {
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};