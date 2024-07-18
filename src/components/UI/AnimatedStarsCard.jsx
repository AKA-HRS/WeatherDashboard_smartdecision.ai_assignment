import React, { useContext, useMemo } from "react";
import { Card, Box } from "@mui/material";
import { FiberManualRecord, Cloud } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";
import SmallCard from "./SmallCard";
import { WeatherData } from "../../context/WeatherCardDataProvider";

// Define keyframes for the meteor drag motion
const moveStars = keyframes`
  0% {
    transform: translate(-50vw, -50vh) rotateZ(45deg);
  }
  25% {
    transform: translate(-40vw, -40vh) rotateZ(45deg);
  }
  50% {
    transform: translate(-10vw, -10vh) rotateZ(45deg) translateY(20px);
  }
  75% {
    transform: translate(10vw, 10vh) rotateZ(45deg) translateY(-10px);
  }
  100% {
    transform: translate(50vw, 50vh) rotateZ(45deg);
  }
`;

// Define keyframes for the cloud floating motion
const moveClouds = keyframes`
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100vw);
  }
`;

// Styled component for the main card container with meteor shower effect
const MeteorShowerContainer = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
}));

// Styled component for individual meteor (star)
const Meteor = styled(FiberManualRecord)(({ delay, left }) => ({
  color: "white",
  width: "5px",
  height: "5px",
  position: "absolute",
  top: -4,
  left: `${left}%`,
  animation: `${moveStars} 60s linear infinite`,
  animationDelay: `${delay}s`,
}));

// Styled component for floating cloud
const FloatingCloud = styled(Cloud)(({ delay, top }) => ({
  color: "white",
  width: "50px",
  height: "30px",
  position: "absolute",
  right: "100%",
  top: `${top}%`,
  animation: `${moveClouds} 120s linear infinite`,
  animationDelay: `${delay}s`,
}));

// Function to determine time period based on time string
const getTimeText = (time) => {
  if (time === "12:00am" || time === "3:00am" || time === "9:00pm") {
    return "Night";
  } else if (time === "12:00pm" || time === "3:00pm") {
    return "Afternoon";
  } else if (time === "6:00pm") {
    return "Evening";
  } else {
    return "Morning";
  }
};

const AnimatedStarsCard = ({ data }) => {
  const { getTimeBackground } = useContext(WeatherData);

  // Memoized values to optimize performance by avoiding unnecessary recalculations
  const time = useMemo(() => data?.dt_txt?.split(" ")[1], [data]);
  const weatherMain = useMemo(() => data?.weather?.[0]?.main, [data]);
  const temperature = useMemo(() => data?.main?.temp, [data]);
  const windSpeed = useMemo(() => data?.wind?.speed || 0, [data]);
  const weatherDescription = useMemo(
    () => data?.weather?.[0]?.description || "",
    [data]
  );

  // Render null if essential data is not available
  if (!time || !weatherMain || !temperature) {
    return null;
  }

  return (
    <MeteorShowerContainer
      sx={{
        background: getTimeBackground(time), // Set background color based on time
        boxShadow: "7",
        borderRadius: "20px",
        width: "100%",
      }}
    >
      {/* Render meteor shower or floating clouds based on time */}
      {getTimeText(time) === "Night"
        ? Array.from({ length: 100 }).map((_, index) => (
            <Meteor
              key={index}
              delay={Math.random() * 10}
              left={Math.random() * 100}
            />
          ))
        : Array.from({ length: 10 }).map((_, index) => (
            <FloatingCloud
              key={index}
              delay={Math.random() * 10}
              top={Math.random() * 100}
            />
          ))}

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* SmallCard component for displaying weather information */}
        <SmallCard
          mode={weatherMain}
          time={time}
          temp={temperature}
          wind={windSpeed}
          description={weatherDescription}
          text={getTimeText}
        />
      </Box>
    </MeteorShowerContainer>
  );
};

export default AnimatedStarsCard;
