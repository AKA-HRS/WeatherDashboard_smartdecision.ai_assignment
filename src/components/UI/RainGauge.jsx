import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge"; // Importing Gauge component and gaugeClasses from MUI x-charts

const settings = {
  width: 160,
  height: 160,
}; // Settings for the Gauge component

function RainGauge({ value }) {
  let color = "";
  let label = "";

  // Determine color and label based on value
  if (value < 33.33) {
    color = "green"; // Low rain intensity
    label = "Low";
  } else if (value < 66.66) {
    color = "orange"; // Medium rain intensity
    label = "Medium";
  } else {
    color = "red"; // High rain intensity
    label = "High";
  }

  return (
    <Gauge
      {...settings} // Spread the settings object into the Gauge component
      value={value} // Set the value of the Gauge component
      title={label} // Set the label of the Gauge component
      cornerRadius="50%" // Set the corner radius of the Gauge component
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40, // Set the font size of the value text
        },
        [`& .${gaugeClasses.valueText}`]: {
          // Empty style object for value text (potential for additional styling)
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: color, // Set the color of the value arc based on the value
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled, // Set the color of the reference arc
        },
      })}
    />
  );
}

export default RainGauge;
