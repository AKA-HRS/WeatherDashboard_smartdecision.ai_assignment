import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { WeatherData } from "../../context/WeatherCardDataProvider";
import { Box, Typography } from "@mui/material";

const Graph = () => {
  const { graph } = useContext(WeatherData); // Get graph data from context

  // Custom tooltip component for displaying temperature data
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          className="custom-tooltip"
          style={{
            backgroundColor: "#8884d8",
            color: "#fff",
            height: "80px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography>{`Time: ${label}`}</Typography>
          <Typography>{`Temperature: ${payload[0].value}°C`}</Typography>
        </Box>
      );
    }

    return null; // Return null if tooltip is not active
  };

  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart
        data={graph} // Provide graph data to AreaChart
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="time" stroke="#fff" /> // X-axis displaying time
        <YAxis stroke="#fff" /> // Y-axis
        <Tooltip content={<CustomTooltip />} /> // Custom tooltip
        <Area
          type=""
          dataKey="temperature"
          stroke="#8884d8"
          fill="#F3F8FF"
        />{" "}
        // Area chart for temperature data
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
