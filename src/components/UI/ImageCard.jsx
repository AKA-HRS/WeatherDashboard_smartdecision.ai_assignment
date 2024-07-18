import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const ImageCard = ({ imageUrl, title, redirectLink }) => {
  const [hovered, setHovered] = useState(false); // State to track hover status

  const cardStyles = {
    position: "relative",
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Box shadow for depth
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px", // Ensure the image corners match the card
    filter: hovered ? "none" : "blur(3px)", // Remove blur on hover
    transition: "transform 0.3s ease, filter 0.3s ease", // Smooth transitions
    transform: hovered ? "scale(1.05)" : "scale(1)", // Scale up on hover
  };

  const contentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "16px",
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
    backdropFilter: "blur(10px)", // Glass-like blur effect
    transition: "opacity 0.3s ease",
    opacity: hovered ? 0 : 1, // Hide content on hover
    textAlign: "center",
    borderRadius: "10px", // Rounded corners
    width: "80%", // Adjust content width
  };

  return (
    <>
      <Box
        style={cardStyles}
        onMouseEnter={() => setHovered(true)} // Set hover state to true
        onMouseLeave={() => setHovered(false)} // Set hover state to false
        onClick={() => {
          redirectLink(title);
        }} // Handle click event to redirect
      >
        <img
          className="image"
          src={imageUrl}
          alt={title}
          style={imageStyles} // Apply image styles
        />
        <Box style={contentStyles}>
          <Typography variant="h5" gutterBottom>
            {title} 
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ImageCard;
