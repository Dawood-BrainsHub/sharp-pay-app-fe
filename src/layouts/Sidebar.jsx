import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddCardIcon from '@mui/icons-material/AddCard';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { text: "Recipients", icon: <PeopleIcon />, path: "/recipients" },
    { text: "Payments", icon: <AssignmentIcon />, path: "/payments" },
    { text: "Banks", icon: <AddCardIcon />, path: "/banks" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
          backgroundColor: '#005c66',
          color: '#fff',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          p: 2,
        }}
      >
        {open && <Typography variant="h6">Sharp Pay App</Typography>}
        <IconButton onClick={toggleDrawer} sx={{ color: '#fff' }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => navigate(item.path)}
            sx={{
              py: 1,
              px: 2,
              color: '#fff',
              '&:hover': {
                backgroundColor: 'primary.main',
                borderRadius:'8px',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
      <Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <List>
          <ListItemButton sx={{
              py: 1,
              px: 2,
              color: '#fff',
              '&:hover': {
                backgroundColor: 'primary.main',
                borderRadius:'8px',
              },
            }}>
            <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;