import React from "react";
import { Box, Typography } from "@mui/material";
import {
  NightsStay,
  LightMode,
  Cloud,
  Thunderstorm,
  Nightlight,
} from "@mui/icons-material";

// Function to get the appropriate weather icon based on weather mode and time
const getIcon = (mode, time) => {
  const isClearSky = mode === "Clear";
  const isCloudy = mode === "Clouds";

  // Return night icons for clear sky at night times
  if (isClearSky) {
    if (
      time === "6:00pm" ||
      time === "9:00pm" ||
      time === "12:00am" ||
      time === "3:00am"
    ) {
      return (
        <Nightlight sx={{ width: "100px", height: "100px", rotate: "-40deg" }} />
      );
    }
    // Return day icons for clear sky at day times
    if (
      time === "6:00am" ||
      time === "9:00am" ||
      time === "12:00pm" ||
      time === "3:00pm"
    ) {
      return <LightMode sx={{ width: "100px", height: "100px" }} />;
    }
  }

  // Return night icons for cloudy sky at night times
  if (isCloudy) {
    if (
      time === "6:00pm" ||
      time === "9:00pm" ||
      time === "12:00am" ||
      time === "3:00am"
    ) {
      return <NightsStay sx={{ width: "100px", height: "100px" }} />;
    }
    // Return day icons for cloudy sky at day times
    if (
      time === "6:00am" ||
      time === "9:00am" ||
      time === "12:00pm" ||
      time === "3:00pm"
    ) {
      return <Cloud sx={{ width: "100px", height: "100px" }} />;
    }
  }

  // Return thunderstorm icon for rainy weather
  if (mode === "Rain") {
    return <Thunderstorm sx={{ width: "100px", height: "100px" }} />;
  }

  return null; // Return null if no matching conditions
};

const SmallCard = React.memo(
  ({ mode, time, temp, wind, description, text }) => {
    const icon = getIcon(mode, time); // Get the weather icon based on mode and time
    return (
      <>
        <Box
          width={160}
          height={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {icon} {/* Display the weather icon */}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginLeft: "2px",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontWeight: "bold",
              width: "100%",
              display: "block",
              marginRight: "0px",
              position: "absolute",
              right: 10,
              textAlign: "right",
            }}
          >
            {time} {/* Display the time */}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "0px" }}>
            {temp}
            <sup>o</sup> C {/* Display the temperature */}
          </Typography>
          <Typography variant="h6">{text(time)}</Typography>{" "}
          {/* Display additional text based on time */}
          <Typography variant="p">{description}</Typography>{" "}
          {/* Display the weather description */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 10,
              display: "flex",
              alignItems: "center",
              textAlign: "right",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontWeight: "bold",
              }}
            >
              {wind} kmph {/* Display the wind speed */}
            </Typography>
          </Box>
        </Box>
      </>
    );
  }
);

export default SmallCard;
