import React from "react";
import { Box, Typography } from "@mui/material";

const Compass = ({ direction }) => {
  const compassSize = 160; // Size of the compass
  const needleLength = compassSize / 2 - 35; // Length of the needle

  // Convert direction to radians for positioning the needle
  const radians = (direction / 180) * Math.PI;

  // Calculate needle endpoint coordinates based on direction
  const needleX = compassSize / 2 + needleLength * Math.sin(radians);
  const needleY = compassSize / 2 - needleLength * Math.cos(radians);

  return (
    <Box
      sx={{
        position: "relative",
        width: `${compassSize}px`,
        height: `${compassSize}px`,
        borderRadius: "100%",
        backgroundColor: "#edf2f8",
        border: "2px dashed #000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Compass Markings */}
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        N
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        S
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        W
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        E
      </Typography>

      {/* Compass Needle */}
      <svg
        width={compassSize}
        height={compassSize}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <line
          x1={compassSize / 2}
          y1={compassSize / 2}
          x2={needleX}
          y2={needleY}
          stroke="red"
          strokeWidth="3"
          markerEnd="url(#arrowhead)" // Arrowhead marker for the needle
        />
        <circle cx={compassSize / 2} cy={compassSize / 2} r={5} fill="red" />{" "}
        {/* Needle pivot */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="red" />{" "}
            {/* Arrowhead shape */}
          </marker>
        </defs>
      </svg>
    </Box>
  );
};

export default Compass;
