import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a new context for theme management
const ThemeContext = createContext();

// Define shared breakpoints object
const breakpoints = {
  values: {
    xs: 0,
    sm: 769,
    md: 1204,
    lg: 1440,
    xl: 1536,
  },
};

// Define initial themes for light and dark modes
const lightTheme = createTheme({
  breakpoints,
  palette: {
    mode: "light",
    primary: {
      main: "#0077FF",
      black: "#000101",
      heart: "#f73378",
      red: "#f50057",
      background: "#cbcbcb",
      page: "#fefeff",
      paper: "#ffffff",
      night: "#030247",
      sunny: "#ffdf00",
      blue: "#2196f3",
      pressure: "#A0C6FC",
      evening: "#f9a825",
      morning: "#2196f3",
      user: "#20c88f",
      textboxhover: "#20c88f",
      textboxlable: "gray",
    },
  },
});

const darkTheme = createTheme({
  breakpoints,
  palette: {
    mode: "dark",
    primary: {
      main: "#0077FF",
      black: "#000101",
      heart: "#f73378",
      red: "#f50057",
      background: "#222831",
      page: "#fefeff",
      paper: "#1e1e1h", //paper color
      night: "#030247",
      sunny: "#ffdf00",
      blue: "#2196f3",
      pressure: "#A0C6FC",
      evening: "#f9a825",
      morning: "#2196f3",
      user: "#7FFFD4", //
      textboxhover: "#20c88f", //searchbox border
      textboxlable: "#20c88f", //searchbox lable
    },
  },
});

// ThemeContextProvider component to provide theme context to children components
export const ThemeContextProvider = ({ children }) => {
  const initialMode = "dark"; // Default mode

  const [mode, setMode] = useState(initialMode);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const selectedTheme = mode === "light" ? lightTheme : darkTheme;

  const contextValue = { theme: selectedTheme, mode, toggleMode };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to consume the theme context
export const useThemeContext = () => useContext(ThemeContext);
