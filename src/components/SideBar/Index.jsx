import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Dialog,
  IconButton,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  AddLocationAltOutlined,
  FavoriteBorderOutlined,
  ExitToAppOutlined,
  AddLocationAltRounded,
  DashboardOutlined,
  FavoriteOutlined,
  Close,
  Thermostat,
  AccountCircleOutlined,
  AccountCircle,
} from "@mui/icons-material";
import { useContext } from "react";
import { UserData } from "../../context/userData";
import GoogleAuth from "../Auth/GoogleAuth";
import MapContainer from "../UI/MapContainer";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { listIndex } from "../../context/ListIndex";
import MessageBox from "../UI/MessageBox";
import ThemeSwitch from "../UI/ThemeSwitch";

function Index({}) {
  // Context and state initialization
  const { selectedListIndex, setSelectedListIndex } = useContext(listIndex);
  const { theme } = useThemeContext();
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false); // State for controlling MessageBox visibility
  const [access, setAccess] = useState(""); // State to store access page name
  const { loggedIn, logout } = useContext(UserData); // Context for user authentication
  const [openDialog, setOpenDialog] = useState(false); // State for controlling full-screen dialog visibility
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg")); // Media query to determine screen size

  // Effect to automatically close MessageBox after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, [open, setOpen]);

  // Handler function for list item button clicks
  const handleListButton = (e, number, goto) => {
    setSelectedListIndex(number); // Set selected list index

    // Handle special cases based on the selected list item
    if (number === 1) {
      navigateTo(goto); // Navigate to "/map"
      setOpenDialog(true); // Open full-screen dialog for "Map" button
      return;
    }

    if (goto === "/profile" || goto === "/saved location") {
      // Redirect to login page if user is not logged in for restricted access pages
      if (loggedIn) {
        navigateTo(goto); // Navigate to "/profile" or "/savedlocation"
        return;
      } else {
        navigateTo("/"); // Redirect to home if not logged in
        setAccess(goto.toUpperCase()); // Set the access page name
        setOpen(true); // Open MessageBox indicating login required
        setSelectedListIndex(0); // Reset selected list index
        return;
      }
    }

    navigateTo(goto); // Navigate to other routes
  };

  // Handler function to close the full-screen dialog
  const closeDialogHandler = () => {
    navigateTo("/"); // Navigate to home
    setOpenDialog(false); // Close the full-screen dialog
    setSelectedListIndex(0); // Reset selected list index
  };

  return (
    <>
      {/* Main Paper container */}
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          margin: "3px",
          backgroundColor: theme.palette.paper,
          borderRadius: "20px",
        }}
      >
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box>
            {/* Title */}
            <Typography
              width={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="h6"
            >
              Weather Forecast {/* Site name */}
            </Typography>

            {/* List of navigation items */}
            <List component="nav" sx={{ width: "100%" }}>
              {/* Dashboard item */}
              <ListItemButton
                selected={selectedListIndex === 0}
                onClick={(e) => handleListButton(e, 0, "/")}
                sx={{ borderRadius: "10px", my: "5px", width: "100%" }}
              >
                <ListItemIcon>
                  {selectedListIndex === 0 ? (
                    <Dashboard sx={{ color: theme.palette.primary.main }} />
                  ) : (
                    <DashboardOutlined
                      sx={{ color: theme.palette.primary.main }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={
                    selectedListIndex === 0
                      ? { color: theme.palette.primary.main }
                      : {}
                  }
                  primary="Dashboard"
                />
              </ListItemButton>

              {/* Map item */}
              <ListItemButton
                selected={selectedListIndex === 1}
                onClick={(e) => handleListButton(e, 1, "/map")}
                sx={{ borderRadius: "10px", my: "5px" }}
              >
                <ListItemIcon>
                  {selectedListIndex === 1 ? (
                    <AddLocationAltRounded
                      sx={{ color: theme.palette.primary.red }}
                    />
                  ) : (
                    <AddLocationAltOutlined
                      sx={{ color: theme.palette.primary.red }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={
                    selectedListIndex === 1
                      ? { color: theme.palette.primary.red }
                      : {}
                  }
                  primary="Map"
                />
              </ListItemButton>

              {/* Saved Location item */}
              <ListItemButton
                selected={selectedListIndex === 2}
                onClick={(e) => handleListButton(e, 2, "/saved location")}
                sx={{ borderRadius: "10px", my: "5px" }}
              >
                <ListItemIcon>
                  {selectedListIndex === 2 ? (
                    <FavoriteOutlined
                      sx={{ color: theme.palette.primary.heart }}
                    />
                  ) : (
                    <FavoriteBorderOutlined
                      sx={{ color: theme.palette.primary.heart }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={
                    selectedListIndex === 2
                      ? { color: theme.palette.primary.heart }
                      : {}
                  }
                  primary="Saved Location"
                />
              </ListItemButton>

              {/* Profile item */}
              <ListItemButton
                selected={selectedListIndex === 3}
                onClick={(e) => handleListButton(e, 3, "/profile")}
                sx={{ borderRadius: "10px", my: "5px" }}
              >
                <ListItemIcon>
                  {selectedListIndex === 3 ? (
                    <AccountCircle sx={{ color: theme.palette.primary.user }} />
                  ) : (
                    <AccountCircleOutlined
                      sx={{ color: theme.palette.primary.user }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={
                    selectedListIndex === 3
                      ? { color: theme.palette.primary.user }
                      : {}
                  }
                />
              </ListItemButton>

              {/* Forecast item (visible on small screens only) */}
              {isLgScreen && (
                <ListItemButton
                  selected={selectedListIndex === 4}
                  onClick={(e) => handleListButton(e, 4, "/forecast")}
                  sx={{ borderRadius: "10px", my: "5px" }}
                >
                  <ListItemIcon>
                    <Thermostat sx={{ color: theme.palette.primary.text }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Forecast"
                    sx={
                      selectedListIndex === 4
                        ? { color: theme.palette.primary.text }
                        : {}
                    }
                  />
                </ListItemButton>
              )}
            </List>

            {/* Theme switch component */}
            <ThemeSwitch />
          </Box>

          {/* Logout or GoogleAuth component based on login status */}
          <Box
            mt="auto"
            mb="20px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {loggedIn ? (
              <ListItemButton
                sx={{ borderRadius: "10px", my: "5px" }}
                onClick={(e) => {
                  logout(); // Logout function
                  navigateTo("/"); // Navigate to home
                  setSelectedListIndex(0); // Reset selected list index
                }}
              >
                <ListItemIcon>
                  <ExitToAppOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            ) : (
              <GoogleAuth />
            )}
          </Box>
        </Box>

        {/* Message Box for displaying login access message */}
        <MessageBox
          message={`Please login to access ${access} page`}
          open={open}
          close={() => setOpen(false)}
        />
      </Paper>

      {/* Full-screen dialog for MapContainer */}
      {openDialog && (
        <Dialog fullScreen open={openDialog} onClose={closeDialogHandler}>
          <IconButton
            edge="start"
            color="error"
            onClick={closeDialogHandler}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 0,
              top: 10,
              "&:hover": {
                backgroundColor: "#FF0000",
                color: "white",
              },
            }}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <MapContainer />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Index;
