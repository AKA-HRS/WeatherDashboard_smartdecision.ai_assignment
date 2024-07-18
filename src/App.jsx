import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import UserDataProvider, { UserData } from "./context/userData";
import Layout from "./Layout";
import WeatherCardDataProvider from "./context/WeatherCardDataProvider";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import Forecast from "./screens/Forecast";
import MapContainer from "./components/UI/MapContainer";
import SavedLocation from "./screens/SavedLocation";
import GoogleAuth from "./components/Auth/GoogleAuth";
import ListIndexProvider from "./context/ListIndex";

function App() {
  return (
    <>
      <CssBaseline /> {/* Resetting CSS */}
      <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        {/* Provide theme context to the application */}
        <ThemeContextProvider>
          {/* Provide user data context to the application */}
          <UserDataProvider>
            {/* Provide weather card data context to the application */}
            <WeatherCardDataProvider>
              {/* Provide list index context to the application */}
              <ListIndexProvider>
                {/* Define application routes */}
                <Routes>
                  {/* Define main layout route */}
                  <Route path="/" element={<Layout />}>
                    {/* Define home route */}
                    <Route index element={<Home />} />
                    {/* <Route index element={<Home />} /> */}
                    {/* Define map route */}
                    <Route path="/map" element={<MapContainer />} />
                    {/* Define profile route */}
                    <Route path="/profile" element={<Profile />} />
                    {/* Define forecast route */}
                    <Route path="/forecast" element={<Forecast />} />
                    {/* Define saved location route */}
                    <Route path="/saved location" element={<SavedLocation />} />
                    {/* Define user session route */}
                    <Route path="/usersession" element={<GoogleAuth />} />
                  </Route>
                </Routes>
              </ListIndexProvider>
            </WeatherCardDataProvider>
          </UserDataProvider>
        </ThemeContextProvider>
      </Box>
    </>
  );
}

export default App;
