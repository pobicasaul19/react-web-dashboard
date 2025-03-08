import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import ListItemButton from '@mui/material/ListItemButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { NavLink, useLocation } from 'react-router-dom';

const mainListItems = [
  { link: '/', text: 'Home', icon: <HomeRoundedIcon /> },
  { link: '/companies', text: 'Company', icon: <BusinessIcon /> },
  { link: '/articles', text: 'Article', icon: <ArticleIcon /> },
  { link: '/users', text: 'Users', icon: <PeopleRoundedIcon /> },
];

export default function MenuContent() {
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, i) => (
          <NavLink to={item.link} key={i}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton selected={location.pathname === item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Stack>
  );
}