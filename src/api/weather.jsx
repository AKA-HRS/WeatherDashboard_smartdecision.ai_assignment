import axios from "axios";

// Function to fetch weather data for a city from OpenWeatherMap API
export const data = async (city, store) => {
  try {
    // Make GET request to OpenWeatherMap API using axios
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );

    // Call store function with fetched data and return its result
    return store(res.data);
  } catch (error) {
    // Handle errors during API request
    console.error("Error fetching data: ", error);
    window.location.reload(); // Reload the window in case of error (typically for recovery)
  }
};
