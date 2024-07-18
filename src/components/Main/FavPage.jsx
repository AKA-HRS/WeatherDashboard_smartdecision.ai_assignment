import { Box, Paper, useMediaQuery, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../context/userData";
import ImageCard from "../UI/ImageCard";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { HeartBroken } from "@mui/icons-material";
import axios from "axios";

function FavPage() {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md")); // Media query for medium-sized screens
  const { favPlace } = useContext(UserData); // Access favorite places from context
  const [imageList, setImageList] = useState({}); // State to store fetched image URLs
  const { theme } = useThemeContext(); // Access theme context for styling
  const navigateTo = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (favPlace?.length > 0) {
          const promises = favPlace.map(async (element) => {
            const response = await axios.get(
              `https://api.pexels.com/v1/search?per_page=1&query=${element}`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: import.meta.env.VITE_PEXELS_KEY, // use the apikey you have generated
                },
              }
            );
            return response.data.photos[0]?.src.medium; // Get the medium-sized image URL from Pexels response
          });
          const results = await Promise.all(promises); // Wait for all image fetch promises to resolve
          const updatedImageList = {};
          results.forEach((url, index) => {
            updatedImageList[favPlace[index]] = url; // Map each place name to its corresponding image URL
          });
          setImageList(updatedImageList); // Update state with the fetched image URLs
        } else {
          setImageList({}); // Clear image list if favPlace is empty
        }
      } catch (error) {
        console.error("Error fetching images:", error); // Log error if image fetching fails
        navigateTo("/"); // Navigate to home page on error
      }
    };

    fetchImages(); // Call fetchImages function on component mount or when favPlace changes
  }, [favPlace]);

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
        }}
      >
        <Box
          p={3}
          display="flex"
          flex={4} // Flex grow for the content area
          width="100%"
          height="100%"
          flexDirection={isMdScreen ? "column" : "row"} // Column layout for medium screens and below, row layout otherwise
          justifyContent="space-evenly"
          flexWrap="wrap" // Allow items to wrap in row layout
        >
          {Object.entries(imageList).length > 0 ? (
            Object.entries(imageList).map(([key, value]) => (
              <ImageCard
                key={key}
                imageUrl={
                  value || `https://placehold.co/300x200?text=${key}` // Use fetched image URL or placeholder if not available
                }
                title={key} // Use place name as the title for the ImageCard component
              />
            ))
          ) : (
            <Box display="flex" flexDirection={"column"} alignItems="center">
              <HeartBroken
                sx={{
                  marginRight: "8px",
                  color: theme.palette.primary.heart,
                  width: "100px",
                  height: "100px",
                }}
              />
              <Typography variant="h5">No favorite places</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default FavPage;
