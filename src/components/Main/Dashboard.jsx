import React, { useContext, useMemo, useCallback } from "react";
import {
  Paper,
  Box,
  Grid,
  Typography,
  Avatar,
  Tooltip,
  Divider,
  useMediaQuery,
} from "@mui/material";
import SearchBox from "../UI/SearchBox";
import Card from "../UI/Card";
import { CardData, WeatherData } from "../../context/WeatherCardDataProvider";
import { UserData } from "../../context/userData";
import { useThemeContext } from "../../context/ThemeContext";
import sunrise from "../../assets/sunrise.png";
import sunset from "../../assets/sunset.png";
import WeatherCard from "../UI/WeatherCard";
import Compass from "../UI/Compass";
import RainGauge from "../UI/RainGauge";
import Gauge from "../UI/Gauge";

function Dashboard() {
  // Context and theme management
  const { theme } = useThemeContext(); // Access theme context
  const { user } = useContext(UserData); // Access user data from context
  const { cardData } = useContext(CardData); // Access weather card data from context
  const { result } = useContext(WeatherData); // Access weather data result from context

  // Media query hooks to handle responsive design
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // Check if screen size is extra-small
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // Check if screen size is small
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // Check if screen size is medium
  const isLG = useMediaQuery(theme.breakpoints.only("lg")); // Check if screen size is large

  // Width calculation based on user presence and screen size
  const width = useMemo(() => {
    if (user) {
      if (isXs) return "90%";
      if (isSm) return "92%";
      if (isMd) return "93%";
      if (isLG) return "94%";
    }
    return "100%";
  }, [user, isXs, isSm, isMd, isLG]);

  // Memoized function to get wind direction text based on degree
  const getDirectionText = useMemo(
    () => (degree) => {
      if (degree >= 338 || degree <= 22) {
        return "N";
      } else if (degree > 22 && degree <= 67) {
        return "NE";
      } else if (degree > 67 && degree <= 112) {
        return "E";
      } else if (degree > 112 && degree <= 157) {
        return "SE";
      } else if (degree > 157 && degree <= 202) {
        return "S";
      } else if (degree > 202 && degree <= 247) {
        return "SW";
      } else if (degree > 247 && degree <= 292) {
        return "W";
      } else if (degree > 292 && degree <= 337) {
        return "NW";
      }
    },
    []
  );

  // Memoized function to convert pressure to percentage for gauge
  const convertPressureToPercentage = useMemo(() => {
    const oldMin = 980;
    const oldMax = 1050;
    const newMin = 1;
    const newMax = 100;

    return (pressure) => {
      if (!pressure) return 0;
      const newValue =
        ((pressure - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
      return newValue;
    };
  }, []);

  // Function to format time based on timestamp and timezone offset
  const formatTime = useCallback((timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }, []);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          margin: "3px",
          backgroundColor: theme.palette.primary.paper, // Set background color from theme
          color: theme.palette.primary.text, // Set text color from theme
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          p={3}
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          overflow="auto"
        >
          <Box>
            <Box
              width="100%"
              height="60px"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item width={width}>
                  <SearchBox /> {/* Render the search box component */}
                </Grid>
                {user && (
                  <Tooltip title={user.name}>
                    <Grid
                      item
                      width="5%"
                      height="55px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Avatar alt="User Avatar" src={user.picture} />{" "}
                      {/* Render user avatar */}
                    </Grid>
                  </Tooltip>
                )}
              </Grid>
            </Box>

            <Box
              marginTop="12px"
              borderRadius="10px"
              boxShadow={2}
              sx={{
                color: "white", // Set text color for nested components
              }}
            >
              <Card /> {/* Render the Card component */}
            </Box>
          </Box>

          {cardData && cardData.main && (
            // Check if cardData exists before rendering
            <Grid container spacing={2} marginTop="12px">
              <WeatherCard
                title="Wind"
                value={cardData.wind.speed}
                unit="km/h"
                subtitle="Wind speed"
                tooltip={`${cardData.wind.speed}Km/h in ${getDirectionText(
                  cardData.wind.deg
                )}`}
                component={<Compass direction={cardData.wind.deg} />}
              />
              {/* Render WeatherCard for wind  */}

              <WeatherCard
                title="Rain"
                value={cardData.main.humidity}
                unit="%"
                subtitle="Rain chance"
                tooltip={`Rain chances are ${cardData.main.humidity}%`}
                component={<RainGauge value={cardData.main.humidity} />}
              />
              {/* Render WeatherCard for rain */}

              <WeatherCard
                title="Pressure"
                value={cardData.main.pressure}
                unit="hpa"
                subtitle="Today Pressure"
                tooltip={`Pressure at sea level ${convertPressureToPercentage(
                  cardData.main.pressure
                )}%`}
                component={
                  <Gauge
                    value={convertPressureToPercentage(cardData.main.pressure)}
                  />
                }
              />
              {/* Render WeatherCard for pressure  */}

              <Grid item xs={12} md={6}>
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
                  <Box
                    height="100%"
                    width={"100%"}
                    display="flex"
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Tooltip title="Sunrise">
                      <Box
                        height="100%"
                        width="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        padding={2}
                        sx={{
                          backgroundImage: `url(${sunrise})`,
                          // Set background image for sunrise
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                      >
                        <Typography color={"white"} fontWeight={"bold"}>
                          {formatTime(
                            result.city.sunrise,
                            result.city.timezone
                          )}
                        </Typography>
                      </Box>
                    </Tooltip>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Tooltip title="Sunset">
                      <Box
                        height="100%"
                        width="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        padding={2}
                        sx={{
                          backgroundImage: `url(${sunset})`,
                          // Set background image for sunset
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                      >
                        <Typography color={"white"} fontWeight={"bold"}>
                          {formatTime(result.city.sunset, result.city.timezone)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default Dashboard;
