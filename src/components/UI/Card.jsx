import React, { useContext } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Air,
  CycloneOutlined,
  Favorite,
  LocationOnOutlined,
  WaterDropOutlined,
} from "@mui/icons-material";
import { CardData, WeatherData } from "../../context/WeatherCardDataProvider";
import Graph from "./Graph";
import { UserData } from "../../context/userData";

function Card() {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { cardData } = useContext(CardData);
  const { result, getTimeBackground } = useContext(WeatherData);
  const { theme } = useThemeContext();
  const { loggedIn, favPlace, removeFavoritePlace, addFavoritePlace } =
    useContext(UserData);

  // Adjusting font sizes based on screen size
  const temperatureFontSize = isMdScreen ? "60px" : "80px";
  const subtitleFontSize = isMdScreen ? "18px" : "22px";

  // Check if result and result.city are defined before accessing result.city.name
  const isFavorite =
    result && result.city && favPlace.includes(result.city.name);

  return (
    <Box
      sx={{
        width: "100%",
        height: "350px",
        borderRadius: "10px",
        display: "flex",
        padding: 2,
        background: getTimeBackground(cardData?.dt_txt?.split(" ")[1]),
        position: "relative",
      }}
    >
      {loggedIn && (
        // Favorite button for adding or removing from favorites
        <IconButton
          sx={{
            position: "absolute",
            top: 30,
            right: 8,
            zIndex: 1000,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: isFavorite ? "red" : "white",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            if (result && result.city && isFavorite) {
              removeFavoritePlace(result.city.name); // Remove from favorites
            } else if (result && result.city) {
              addFavoritePlace(result.city.name); // Add to favorites
            }
          }}
        >
          <Favorite
            sx={{
              color: isFavorite ? "white" : "black",
            }}
          />
        </IconButton>
      )}

      {/* Main content grid */}
      <Grid
        md={6}
        sm={12}
        item
        width="100%"
        height="100%"
        paddingX="10px"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {/* Top section with location and date */}
        <Box
          component="div"
          display="flex"
          width="100%"
          height="10%"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Location and country */}
          <Box
            component="span"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="10px"
            fontWeight="bold"
          >
            <LocationOnOutlined
              sx={{
                width: "40px",
                height: "40px",
              }}
              color="red"
            />
            <Typography variant="p" fontSize={subtitleFontSize}>
              {result.city
                ? `${result.city.name}, ${result.city.country}`
                : "Loading..."}
            </Typography>
          </Box>

          {/* Date and time */}
          <Typography variant="p" fontWeight="bold" fontSize={subtitleFontSize}>
            {cardData.dt_txt
              ? `${cardData.dt_txt.split(" ")[0]} | ${
                  cardData.dt_txt.split(" ")[1]
                }`
              : "Loading..."}
          </Typography>
        </Box>

        {/* Middle section with temperature */}
        <Box
          component="div"
          width="100%"
          height="80%"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontSize={temperatureFontSize}
            fontFamily="monospace"
          >
            {cardData.main ? `${cardData.main.temp}` : "0"}
            <sup>°</sup>C
          </Typography>
        </Box>

        {/* Bottom section with additional weather info */}
        <Box
          component="div"
          width="100%"
          height="10%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* Pressure */}
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap="2px"
          >
            <CycloneOutlined sx={{ color: theme.palette.primary.pressure }} />
            <Typography variant="h6" color={theme.palette.primary.pressure}>
              {cardData.main ? `${cardData.main.pressure}hpa` : "Loading..."}
            </Typography>
          </Box>

          {/* Humidity */}
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap="2px"
          >
            <WaterDropOutlined sx={{ color: theme.palette.primary.blue }} />
            <Typography variant="h6" color="#2196f3">
              {cardData.main ? `${cardData.main.humidity}%` : "Loading..."}
            </Typography>
          </Box>

          {/* Wind speed */}
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap="2px"
          >
            <Air />
            <Typography variant="h6">
              {cardData.wind ? `${cardData.wind.speed}km/h` : "Loading..."}
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Additional content for smaller screens */}
      {!isMdScreen && (
        <Grid
          xs={6}
          item
          width="100%"
          height="100%"
          paddingX="10px"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(13px)",
              borderRadius: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              color: "black",
            }}
          >
            {/* Title */}
            <Typography variant="h4" fontWeight="bold" color="white">
              Temperature
            </Typography>

            {/* Graph component */}
            <Graph />
          </Box>
        </Grid>
      )}
    </Box>
  );
}

export default Card;
