import { Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component from react-oauth/google
import React, { useContext } from "react";
import { UserData } from "../../context/userData"; // Import UserData context
import { jwtDecode } from "jwt-decode"; // Import jwtDecode function
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

function GoogleAuth() {
  const navigateTo = useNavigate(); // Initialize useNavigate hook for navigation
  const { setUser, user } = useContext(UserData); // Destructure setUser and user from UserData context

  // Callback function for successful Google login
  const responseMessage = (response) => {
    const decodedUser = jwtDecode(response.credential); // Decode JWT response to get user data
    setUser(decodedUser); // Set user data in context
    user !== "" ? navigateTo("/") : ""; // Navigate to "/" if user is logged in
  };

  // Callback function for Google login error
  const errorMessage = (error) => {
    console.error(error); // Log error to console if there's an error during login
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />{" "}
      {/* Render GoogleLogin component with onSuccess and onError callbacks */}
    </Box>
  );
}

export default GoogleAuth;
