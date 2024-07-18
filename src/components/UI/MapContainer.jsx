import React, { useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react"; // Importing Google Map component
import { Box, CircularProgress } from "@mui/material"; // Importing Box and CircularProgress from MUI
import { WeatherData } from "../../context/WeatherCardDataProvider"; // Importing WeatherData context

const MapContainer = () => {
  const { result } = useContext(WeatherData); // Accessing weather data from context
  const navigate = useNavigate(); // Hook for navigation

  // Memoize the map center and zoom values to avoid recalculating on each render
  const defaultProps = useMemo(() => {
    if (result && result.city && result.city.coord) {
      return {
        center: {
          lat: result.city.coord.lat,
          lng: result.city.coord.lon,
        },
        zoom: 12,
      };
    }
    return null; // Return null if result or coordinates are not available
  }, [result]);

  // Redirect to home page if data is not available
  useEffect(() => {
    if (!defaultProps) {
      navigate("/"); // Redirect to home if defaultProps is null
    }
  }, [defaultProps, navigate]);

  // Render loading indicator if defaultProps are not ready yet
  if (!defaultProps) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "99%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress /> {/* Display loading spinner */}
      </Box>
    );
  }

  // Render the map with the memoized center and zoom values
  return (
    <Box
      sx={{
        height: "100%",
        width: "99%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOLE_KEY }} // Google Maps API key
        defaultCenter={defaultProps.center} // Setting default center for the map
        defaultZoom={defaultProps.zoom} // Setting default zoom level for the map
      />
    </Box>
  );
};

export default MapContainer;
