/* eslint-disable react-refresh/only-export-components */
import Cookies from 'js-cookie';
import { AuthUser } from '../models/User';
import { useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (auth: AuthUser) => void;
  logout: () => void;
  getAuth: () => AuthUser | null;
}
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authValue, setAuthValue] = useState<AuthUser | null>(null);
  const isAuthenticated = !!authValue;
  const theme = useTheme();

  // Get auth from cookies when the component mounts
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setAuthValue({ user: null, token })
    }
  }, []);

  const login = (auth: AuthUser) => {
    setAuthValue({ user: auth.user, token: null })
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('user');
    setAuthValue(null);
  };

  const getAuth = () => authValue;

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