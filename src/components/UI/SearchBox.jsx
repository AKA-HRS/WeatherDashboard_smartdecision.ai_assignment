import React, { useState, useEffect, useContext } from "react";
import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { data } from "../../api/weather"; // Importing the data fetching function
import { WeatherData } from "../../context/WeatherCardDataProvider"; // Importing the WeatherData context

function SearchBox() {
  const [search, setSearch] = useState("Delhi"); // Initializing the search state with default value "Delhi"
  const { handelSearch } = useContext(WeatherData); 
  return (
    <Box width="100%">
      <TextField
        id="outlined-basic"
        label="Search City"
        variant="outlined"
        value={search} // Bind the search input value to the state
        onChange={(e) => setSearch(e.target.value)} // Update the search state on input change
        sx={{
          width: "100%", // Set the width of the text field to 100%
        }}
        InputProps={{
          endAdornment: (
            <Tooltip title="Search" color="secondary">
              <IconButton color="primary" onClick={()=>handelSearch(search)}>
                <Search />
                {/* Search icon button to trigger the search operation */}
              </IconButton>
            </Tooltip>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBox;
