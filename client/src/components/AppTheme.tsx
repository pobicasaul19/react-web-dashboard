import type { IReactProps } from '../layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core';

export default function AppTheme(props: IReactProps) {
  const { children } = props;
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      {children}
    </AppProvider>
  );
}