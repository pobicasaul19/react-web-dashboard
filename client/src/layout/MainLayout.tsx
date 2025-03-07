import React from 'react';
import AppTheme from '../components/AppTheme';
import AppNavbar from '../components/AppNavBar';
import AppSideMenu from '../components/AppSideMenu';
import { Box, Container, Stack } from '@mui/material';

export interface IReactProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IReactProps> = ({ children }) => {
  return (
    <AppTheme>
      <Box sx={{ display: 'flex' }}>
        <AppSideMenu />
        <Container
          maxWidth="xl"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: {xs: 10, md: 0}, gap: 4 }}
          >
          <Stack spacing={2}>
            <AppNavbar />
            {children}
          </Stack>
        </Container>
      </Box>
    </AppTheme>
  );
};
