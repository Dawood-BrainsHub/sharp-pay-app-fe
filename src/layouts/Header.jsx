import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const drawerWidth = 240;

const Header = ({ open, toggleDrawer }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 60px)`,
        ml: open ? `${drawerWidth}px` : "60px",
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Menu toggle + Logo/Text */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Box>

        {/* Right: Avatar/Profile */}
        <Box display="flex" alignItems="center" gap={2}>
          <UserMenu user={user} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
