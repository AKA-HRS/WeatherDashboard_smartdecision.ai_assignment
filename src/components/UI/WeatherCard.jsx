import React from "react";
import { Grid, Box, Typography, Tooltip } from "@mui/material";

const WeatherCard = React.memo(
  ({ title, value, unit, subtitle, icon, tooltip, component }) => {
    return (
      <Grid item xs={12} md={6} color={"black"}>
        {/* Tooltip to display additional information when hovering over the card */}
        <Tooltip title={tooltip}>
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="20px"
            height="185px"
            backgroundColor="#edf2f8"
            boxShadow={2}
          >
            {/* Left section of the card for displaying title, subtitle, and value */}
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width={"40%"}
            >
              <Typography variant="h4">{title}</Typography>
              <Typography variant="body2" color="gray">
                {subtitle}
              </Typography>
              <Typography variant="h5">{`${value} ${unit}`}</Typography>
            </Box>
            {/* Right section of the card for displaying the icon or component */}
            <Box
              height="100%"
              width={"60%"}
              display="flex"
              alignItems="center"
              justifyContent={"center"}
            >
              {icon ? (
                <img src={icon} alt={title} style={{ height: "100%" }} />
              ) : (
                component
              )}
            </Box>
          </Box>
        </Tooltip>
      </Grid>
    );
  }
);

export default WeatherCard;
