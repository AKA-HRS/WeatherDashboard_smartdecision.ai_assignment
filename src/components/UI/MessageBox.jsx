import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar"; // Importing Snackbar component from MUI

const MessageBox = ({ message, open, close }) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
      {/* Snackbar component to display messages */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning the Snackbar at the top center
        open={open} // Controls whether the Snackbar is open or not
        message={message} // The message to display
        autoHideDuration={2000} // Auto close after 2 seconds
        onClose={close} // Close handler
      />
    </Box>
  );
};

export default MessageBox;
