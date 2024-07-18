import React, { createContext, useState, useEffect } from "react";

// Create a new context for user data
export const UserData = createContext();

// UserDataProvider component definition
const UserDataProvider = ({ children }) => {
  // Initialize 'user' state from localStorage or set to null if not found
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize 'favPlace' state from localStorage or set to null if not found
  const [favPlace, setFavPlace] = useState(() => {
    const savedfavPlace = localStorage.getItem("favPlace");
    return savedfavPlace ? JSON.parse(savedfavPlace) : [];
  });

  // Sync 'favPlace' state to localStorage whenever it changes
  useEffect(() => {
    if (favPlace !== null) {
      localStorage.setItem("favPlace", JSON.stringify(favPlace));
    }
  }, [favPlace]);

  // State variable to track login status, initially set based on whether 'user' is present
  const [loggedIn, setLoggedIn] = useState(!!user);

  // Effect to save 'user' data to localStorage and update login status whenever 'user' changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true); // Update login status when user is logged in
    } else {
      localStorage.removeItem("user"); // Remove user data from localStorage when user logs out
      setLoggedIn(false); // Update login status when user logs out
    }
  }, [user]);

  // Function to log out the user
  const logout = () => {
    setUser(null);
    setFavPlace([])
    localStorage.removeItem("user"); // Clear user data from localStorage
    localStorage.removeItem("favPlace");
  };

  const addFavoritePlace = (placeName) => {
    setFavPlace([...favPlace, placeName]);
  };

  const removeFavoritePlace = (placeName) => {
    const updatedPlaces = favPlace.filter((place) => place !== placeName);
    setFavPlace(updatedPlaces);
  };

  // Provide user data and functions to children components via context
  return (
    <UserData.Provider
      value={{
        user,
        setUser,
        logout,
        loggedIn,
        favPlace,
        setFavPlace,
        removeFavoritePlace,
        addFavoritePlace,
      }}
    >
      {children}
    </UserData.Provider>
  );
};

export default UserDataProvider; // Export UserDataProvider component as default
