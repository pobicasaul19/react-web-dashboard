import MenuContent from '../AppMenuContent';
import UserInfo from '../../commons/user-info';
import { useAuth } from '../../feature/AuthContext';
import { Button, Divider, Stack } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function SideMenu() {
  const { logout } = useAuth();
  return (
    <Stack
      sx={{
        maxWidth: '70dvw',
        height: '100%',
      }}
    >
      <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
        <Stack
          direction="row"
          sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
        >
          <UserInfo />
        </Stack>
      </Stack>
      <Divider />
      <Stack sx={{ flexGrow: 1 }}>
        <MenuContent />
        <Divider />
      </Stack>
      <Stack sx={{ p: 2 }}>
        <Button
          fullWidth
          onClick={logout}
          variant="outlined"
          startIcon={<LogoutRoundedIcon />}
          sx={{
            textTransform: 'none',
          }}
        >
          Logout
        </Button>
      </Stack>
    </Stack>
  )
}
