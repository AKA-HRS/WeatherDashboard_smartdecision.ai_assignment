import { Avatar, useMediaQuery, Grid, Paper, Typography } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import { UserData } from "../../context/userData";
import React, { useContext } from "react";

export default function UserInfo() {
  const { theme } = useThemeContext(); // Access theme context for styling
  const { user } = useContext(UserData); // Access user data from context
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // Media query for tablet-sized screens

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        background: theme.palette.primary.page,
        display: "flex",
        margin: "3px",
        borderRadius: "20px",
      }}
    >
      <Grid
        item
        xs={12}
        padding={2}
        display={"flex"}
        style={{ flexDirection: isTablet ? "column" : "row" }} // Adjust layout based on screen size
      >
        {/* Avatar section */}
        <Grid
          item
          lg={6}
          display={"flex"}
          justifyContent={"end"}
          alignItems={"top"}
          style={{ padding: "10px" }}
        >
          <Avatar
            alt="Remy Sharp"
            src={user.picture} // Display user avatar
            sx={{ width: 100, height: 100 }}
          />
        </Grid>

        {/* User information section */}
        <Grid item lg={6} style={{ padding: "10px" }}>
          <Typography variant="h4">{user.name}</Typography>{" "}
          {/* Display user's name */}
          <Typography variant="h6" color={"gray"}>
            {user.email} {/* Display user's email */}
          </Typography>
          <Typography variant="body2" color={"gray"}>
            account verified by {user.iss}{" "}
            {/* Display verification information */}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
