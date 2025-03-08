import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '../models/User';
import UserService from '../services/UserService';
import AppDataTable from '../components/AppDatatable';
import { Edit } from '@mui/icons-material';

const columns: { label: string }[] = [
  { label: 'Firstname' },
  { label: 'Lastname' },
  { label: 'Type' },
  { label: 'Status' },
  { label: 'Action' },
];

export function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUsers();
        setUserList(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const renderCell = (user: User, column: string) => {
    const columnRenderers: Record<string, JSX.Element | null> = {
      Firstname: <p>{user.firstName}</p>,
      Lastname: <p>{user.lastName}</p>,
      Type: <p className='capitalize'>{user.type}</p>,
      Status: <p className='capitalize'>{user.status}</p>,
      Action: <Edit className='cursor-pointer' />,
    };

    return columnRenderers[column] ?? null;
  };
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <AppDataTable
        columns={columns}
        rows={userList}
        renderCell={renderCell}
      />
    </Box>
  )
}