import { Button, Card, CardActionArea, Typography } from '@mui/material';
import { useAuth } from '../feature/AuthContext';

export function HomePage() {
  const { logout } = useAuth();
  const userInfo = localStorage.getItem('auth');
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const { firstName, lastName, type } = parsedUserInfo.user;

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen space-y-5'>
      <Card sx={{ minWidth: 345 }} className='text-center px-4 py-2'>
        <CardActionArea className='capitalize'>
          <Typography>Name: {`${firstName} ${lastName}`}</Typography>
          <Typography>Role: {type}</Typography>
        </CardActionArea>
      </Card>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
