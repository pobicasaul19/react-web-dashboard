import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {
  Container,
  Toolbar,
  Box,
  Stack,
  Typography
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppSideMenuMobile from './AppSideMenuMobile';
import AppMenuButton from './AppMenuButton';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
  width: '100%',
  marginTop: '20px'
}));

export default function AppNavbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, width: '100%' }}>
          <StyledToolbar variant="dense" disableGutters>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                flexGrow: 1,
                width: '100%',
                gap: 1,
              }}
            >
              <Typography sx={{ flexGrow: 1 }} color='black'>React Web Dashboard</Typography>
              <AppMenuButton aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuRoundedIcon />
              </AppMenuButton>
              <AppSideMenuMobile open={open} toggleDrawer={toggleDrawer} />
            </Stack>
          </StyledToolbar>
        </Box>
      </Container>
    </AppBar >
  );
}