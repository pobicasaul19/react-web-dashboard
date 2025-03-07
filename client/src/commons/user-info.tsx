import Avatar from '@mui/material/Avatar';
import { Box, Stack, Typography } from '@mui/material';
import { useAuth } from '../feature/AuthContext';

export default function UserInfo() {
  const { getAuth } = useAuth();
  const { user } = getAuth;
  if (!user) {
    return null;
  }
  const { firstName, lastName, email } = user;

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}>
      <Avatar
        sizes="small"
        alt={`${firstName} ${lastName}`}
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: 'auto' }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {email}
        </Typography>
      </Box>
    </Stack>
  )
}
