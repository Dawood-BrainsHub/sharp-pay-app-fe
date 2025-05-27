import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header open={open} toggleDrawer={toggleDrawer}  />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 2,
            pt: 8,
            pb: 2,
            backgroundColor: "#F8F9FA",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
