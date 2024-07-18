import React, { useContext, useEffect, useState } from "react";
import { Grid, Drawer, Fab, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import Index from "./components/SideBar/Index";
import Forecast from "./screens/Forecast";

function Layout() {
  // Theme and media query hooks from Material UI
  const theme = useTheme();
  const navigateTo = useNavigate();
  useEffect(() => navigateTo("/"), []);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("lg"));

  // State for controlling the drawer open/close and selected index
  const [open, setOpen] = useState(false);

  // const [selectedIndex, setSelectedIndex] = useState(0);

  // Function to toggle the drawer open/close state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Grid
      container
      sx={{
        margin: "0px",
        padding: "5px",
        backgroundColor: theme.palette.primary.background,
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Sidebar section: Shows Index component in a permanent or temporary Drawer based on screen size */}
      {!isMobile ? (
        <Grid
          item
          sm={3.5}
          md={3}
          lg={2}
          sx={{
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Index />
        </Grid>
      ) : (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "80%",
              overflow: "hidden",
            },
            borderRadius: "50px",
          }}
        >
          <Index />
        </Drawer>
      )}

      {/* Main content section: Displays Outlet component based on screen size */}
      <Grid
        item
        sm={8.5}
        md={9}
        lg={7}
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
      >
        {/* Menu button for mobile view */}
        {isMobile && (
          <Fab
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 100,
              left: 10,
              zIndex: 1200,
              borderRadius: "100%",
              width: "50px",
              height: "50px",
            }}
          >
            <MenuIcon />
          </Fab>
        )}
        {/* Outlet to render child components based on routing */}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: isMobile ? "auto" : "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Grid>

      {/* Forecast section: Displays Forecast component for large screens */}
      {isLaptop && (
        <Grid
          item
          lg={3}
          sx={{
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
          }}
        >
          <Forecast />
        </Grid>
      )}
    </Grid>
  );
}

export default Layout;
