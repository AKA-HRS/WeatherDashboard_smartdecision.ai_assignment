import { Box } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

// Constant for converting degrees to radians
const RADIAN = Math.PI / 180;

// Dummy data for the pie chart segments
const data = [
  { name: "Low", value: 50, color: "#00ff00" },
  { name: "Medium", value: 50, color: "#0000ff" },
  { name: "High", value: 50, color: "#ff0000" },
];

// Center coordinates and radius for the gauge needle
const cx = 150;
const cy = 150;
const iR = 50; // Inner radius
const oR = 100; // Outer radius

// Function to draw the gauge needle based on value
const needle = (value, data, cx, cy, iR, oR, color) => {
  // Calculate angle for the needle based on the value
  const ang = 180.0 - (180.0 * value) / 100;
  const length = (iR + 2 * oR) / 3; // Length of the needle
  const sin = Math.sin(-RADIAN * ang); // Sine of the angle
  const cos = Math.cos(-RADIAN * ang); // Cosine of the angle
  const r = 5; // Radius of the needle head
  const x0 = cx + 5; // Initial x-coordinate
  const y0 = cy + 5; // Initial y-coordinate
  const xba = x0 + r * sin; // x-coordinate of point B
  const yba = y0 - r * cos; // y-coordinate of point B
  const xbb = x0 - r * sin; // x-coordinate of point B'
  const ybb = y0 + r * cos; // y-coordinate of point B'
  const xp = x0 + length * cos; // x-coordinate of point P
  const yp = y0 + length * sin; // y-coordinate of point P

  // Return elements representing the needle (circle and path)
  return [
    <circle
      key="needle-circle"
      cx={x0}
      cy={y0}
      r={r}
      fill={color}
      stroke="none"
    />,
    <path
      key="needle-path"
      d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
    />,
  ];
};

// Gauge component rendering the PieChart with a needle
export default function Gauge({ value }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart width={300} height={180}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#000")}
      </PieChart>
    </Box>
  );
}
