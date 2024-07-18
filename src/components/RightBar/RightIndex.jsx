import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Paper,
  Box,
  List,
  ListItem,
  Typography,
  IconButton,
  Tooltip,
  ListItemButton,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import AnimatedStarsCard from "../UI/AnimatedStarsCard";
import { WeatherData, CardData } from "../../context/WeatherCardDataProvider";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { listIndex } from "../../context/ListIndex";

const RightIndex = () => {
  const { theme } = useThemeContext();
  const { setSelectedListIndex } = useContext(listIndex); // Context for managing selected list index
  const { setCardData } = useContext(CardData); // Context for weather card data
  const { weatherDataByDate, setCurrentDateIndex, currentDateIndex, setGraph } =
    useContext(WeatherData); // Context for weather data by date
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Media query for determining screen size

  const dates = useMemo(
    () => Object.keys(weatherDataByDate),
    [weatherDataByDate]
  ); // Memoized array of dates from weather data
  const [selectedIndex, setSelectedIndex] = useState(-1); // State for tracking selected list item index

  // Callback function to handle previous date button click
  const handlePrevDate = useCallback(() => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex((prevIndex) => prevIndex - 1); // Update current date index
      setSelectedIndex(-1); // Reset selected index
    }
  }, [currentDateIndex]);

  // Callback function to handle next date button click
  const handleNextDate = useCallback(() => {
    if (currentDateIndex < dates.length - 1) {
      setCurrentDateIndex((prevIndex) => prevIndex + 1); // Update current date index
      setSelectedIndex(-1); // Reset selected index
    }
  }, [currentDateIndex, dates.length]);

  // Effect to update weather card data when currentDateIndex or weatherDataByDate changes
  useEffect(() => {
    if (weatherDataByDate && dates[currentDateIndex]) {
      const initialEntry = weatherDataByDate[dates[currentDateIndex]][0];
      setCardData(initialEntry); // Update context with initial weather entry
    }
  }, [currentDateIndex, weatherDataByDate, dates, setCardData]);

  // Effect to fetch and update graph data when currentDateIndex or weatherDataByDate changes
  useEffect(() => {
    const fetchData = async () => {
      if (weatherDataByDate && dates[currentDateIndex]) {
        const currentWeatherData = weatherDataByDate[dates[currentDateIndex]];

        if (currentWeatherData) {
          const extractedDataArray = currentWeatherData.map((entry) => ({
            time: parseInt(entry.dt_txt.split(" ")[1].split(":")[0], 10),
            temperature: entry.main.temp,
          }));

          setGraph(extractedDataArray); // Update graph data in context
        }
      }
    };

    fetchData();
  }, [weatherDataByDate, dates, currentDateIndex, setGraph]);

  // Callback function to handle list item click
  const handleListItemClick = useCallback(
    (entry, index) => {
      setCardData(entry); // Update context with selected weather entry
      setSelectedIndex(index); // Set selected index
      if (isMobile) {
        navigate("/"); // Navigate to home on mobile
        setSelectedListIndex(0); // Reset selected list index
      }
    },
    [setCardData]
  );

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        background: theme.palette.primary.paper,
        display: "flex",
        margin: "3px",
        borderRadius: "20px",
        flexDirection: "column",
      }}
    >
      {/* Header with date navigation */}
      <Box p={2} sx={{ flexShrink: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Previous date button */}
          <Tooltip title="Prev" disableHoverListener={currentDateIndex === 0}>
            <span>
              <IconButton
                onClick={handlePrevDate}
                disabled={currentDateIndex === 0}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </span>
          </Tooltip>

          {/* Display current date */}
          <Typography variant="h6">{dates[currentDateIndex]}</Typography>

          {/* Next date button */}
          <Tooltip title="Next">
            <span>
              <IconButton
                onClick={handleNextDate}
                disabled={currentDateIndex === dates.length - 1}
              >
                <KeyboardArrowRight />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* List of weather entries */}
      <List
        sx={{
          flexGrow: 1,
          overflow: "auto",
          margin: "4px",
          padding: 0,
        }}
      >
        {/* Display skeleton loading or weather entries */}
        {weatherDataByDate && dates[currentDateIndex] ? (
          weatherDataByDate[dates[currentDateIndex]].map((entry, index) => (
            <MemoizedListItem
              key={index}
              entry={entry}
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
            />
          ))
        ) : (
          <ListItem>
            <Skeleton
              width="100%"
              height="170px"
              sx={{ borderRadius: "20px" }}
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

// Memoized list item component for performance optimization
const MemoizedListItem = React.memo(
  ({ entry, index, selectedIndex, handleListItemClick }) => (
    <ListItem
      sx={{
        width: "100%",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* List item button for displaying weather card */}
      <ListItemButton
        selected={selectedIndex === index}
        sx={{
          padding: "0px",
          borderRadius: "20px",
          margin: "0px",
          color: "#F4FAFF",
        }}
        onClick={() => handleListItemClick(entry, index)}
      >
        {/* AnimatedStarsCard component */}
        <AnimatedStarsCard data={entry} />
      </ListItemButton>
    </ListItem>
  )
);

export default RightIndex;
