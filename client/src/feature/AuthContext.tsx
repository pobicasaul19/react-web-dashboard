/* eslint-disable react-refresh/only-export-components */
import { AuthUser } from '../models/User';
import { useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (auth: AuthUser) => void;
  logout: () => void;
  getAuth: () => AuthUser | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthUser | null>(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });
  const theme = useTheme();
  const isAuthenticated = !!authState;

  const login = (auth: AuthUser) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuthState(auth);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuthState(null);
  }

  const getAuth = () => authState;

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, []);

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
