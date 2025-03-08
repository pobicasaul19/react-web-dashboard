import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StyledEngineProvider } from '@mui/material';
import { App } from './App.tsx';
import { AuthProvider } from './feature/AuthContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

const ErrorBoundaryApp = ErrorBoundary(App);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <ErrorBoundaryApp />
      </AuthProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
