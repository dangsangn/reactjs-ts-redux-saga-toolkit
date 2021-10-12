import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(()=>({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  },
  active: {
    backgroundColor: '#ddd'
  }
}))

export function Sidebar() {
  const classes = useStyle();
  return (
    <Box height="100%">
      <nav>
        <List>
          <ListItem disablePadding >
            <NavLink  to='/admin/dashbord' className={classes.link} activeClassName={classes.active}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Dashbord" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink to="/admin/students" className={classes.link} activeClassName={classes.active}>
              <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
