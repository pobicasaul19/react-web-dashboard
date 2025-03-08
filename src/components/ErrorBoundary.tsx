import React, { useState } from 'react';
import { Container, Card, Button } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function ErrorBoundary(Component: React.FC) {
  return function ErrorBoundaryWrapper() {
    const [errorState, setErrorState] = useState<ErrorBoundaryState>({
      hasError: false,
      error: null,
    });

    const handleRetry = () => {
      setErrorState({ hasError: false, error: null });
    };

    function handleError(error: Error) {
      setErrorState({ hasError: true, error });
    };

    if (errorState.hasError) {
      return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card sx={{ padding: 4, textAlign: 'center' }}>
            <h1>Something went wrong.</h1>
            <p>{errorState.error?.message}</p>
            <Button onClick={handleRetry}>Retry</Button>
          </Card>
        </Container>
      )
    }

    return (
      <ErrorBoundaryWrapperInner handleError={handleError}>
        <Component />
      </ErrorBoundaryWrapperInner>
    )
  }
}

class ErrorBoundaryWrapperInner extends React.Component<{
  children: React.ReactNode;
  handleError: (error: Error) => void;
}> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.handleError(error);
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
