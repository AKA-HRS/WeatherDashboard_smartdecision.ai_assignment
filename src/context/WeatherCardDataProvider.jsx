import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useThemeContext } from "./ThemeContext";
import { data } from "../api/weather";

// Create contexts for weather data and card data
export const WeatherData = createContext();
export const CardData = createContext();

const WeatherCardDataProvider = ({ children }) => {
  const [result, setResult] = useState({}); // State for storing the weather API result
  const [cardData, setCardData] = useState([]); // State for storing card data
  const [graph, setGraph] = useState([]); // State for storing graph data
  const [currentDateIndex, setCurrentDateIndex] = useState(0); // State for storing the current date index

  const { theme } = useThemeContext(); // Use the custom hook to access the theme context

  async function handelSearch(search) {
    await data(search, setResult);
  }

  useEffect(() => {
    handelSearch("Delhi");
  }, []);

  // Function to format date and time
  const formatDateTime = useCallback((dt_txt) => {
    const date = new Date(dt_txt);
    const formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
      month: "short",
    })}-${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes}${hours >= 12 ? "pm" : "am"}`;

    return `${formattedDate} ${formattedTime}`;
  }, []);

  // Memoized calculation of weather data organized by date
  // const weatherDataByDate = useMemo(() => {
  //   const weatherData = {};
  //   result.list?.forEach((item) => {
  //     const dt_txt_formatted = formatDateTime(item.dt_txt);
  //     const date = dt_txt_formatted.split(" ")[0];
  //     if (!weatherData[date]) {
  //       weatherData[date] = [];
  //     }
  //     weatherData[date].push({ ...item, dt_txt: dt_txt_formatted });
  //   });

  //   return weatherData;
  // }, [result]);

  const { weatherDataByDate, dates } = useMemo(() => {
    // Calculate weather data grouped by date
    const weatherData = {};
    const dates = [];
    let test = null;

    result.list?.forEach((item) => {
      const dt_txt_formatted = formatDateTime(item.dt_txt);
      const date = dt_txt_formatted.split(" ")[0];

      if (!weatherData[date]) {
        weatherData[date] = [];
        dates.push(date); // Collect unique dates
      }

      weatherData[date].push({ ...item, dt_txt: dt_txt_formatted });
    });
    if (dates.length > 1 && !test) {
      setCardData(weatherData[dates[0]][0]); // Set 'test' if multiple dates exist
    }

    return { weatherDataByDate: weatherData, dates, test };
  }, [result]);

  // Function to get the background style based on the time
  const getTimeBackground = useCallback(
    (time) => {
      if (["12:00am", "3:00am", "9:00pm"].includes(time))
        return `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), ${theme.palette.primary.night} 80px)`;
      if (["6:00am", "9:00am"].includes(time))
        return `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.0), ${theme.palette.primary.morning})`;
      if (["12:00pm", "3:00pm"].includes(time))
        return `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.6), ${theme.palette.primary.sunny} 80px)`;
      if (time === "6:00pm")
        return `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.6), ${theme.palette.primary.evening} 60px)`;
    },
    [theme]
  );

  return (
    // Provide the weather data context to children components
    <WeatherData.Provider
      value={{
        handelSearch,
        result,
        setResult,
        weatherDataByDate,
        getTimeBackground,
        graph,
        setGraph,
        currentDateIndex,
        setCurrentDateIndex,
        dates
      }}
    >
      {/* Provide the card data context to children components */}
      <CardData.Provider value={{ cardData, setCardData }}>
        {children}
      </CardData.Provider>
    </WeatherData.Provider>
  );
};

export default WeatherCardDataProvider;
