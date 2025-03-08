/* eslint-disable react-refresh/only-export-components */
import Cookies from 'js-cookie';
import { AuthUser } from '../models/User';
import { useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (auth: AuthUser) => void;
  logout: () => void;
  getAuth: () => AuthUser | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthUser | null>(null);
  const theme = useTheme();
  const isAuthenticated = !!authState;
  
  const login = (auth: AuthUser) => {
    Cookies.set('user', JSON.stringify(auth.user));
    Cookies.set('accessToken', auth.token ?? '');
    setAuthState(auth);
  };

  const logout = () => {
    setAuthState(null);
    Cookies.remove('accessToken');
    Cookies.remove('user')
  };

  const getAuth = () => authState;

  return (
    <AppProvider theme={theme}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout, getAuth }}>
        {children}
      </AuthContext.Provider>
    </AppProvider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
