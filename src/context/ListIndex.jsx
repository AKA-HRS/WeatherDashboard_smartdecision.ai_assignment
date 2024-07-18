import { useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";

// Create a context for the list index
export const listIndex = createContext();

const ListIndexProvider = ({ children }) => {
  // State to keep track of the selected list index, initially set to 0
  const ismd = useMediaQuery((theme) => theme.breakpoints.between("xs", "md"));
  const [selectedListIndex, setSelectedListIndex] = useState(0);

  return (
    // Provide the selectedListIndex and setSelectedListIndex to the component tree
    <listIndex.Provider value={{ selectedListIndex, setSelectedListIndex }}>
      {children}
    </listIndex.Provider>
  );
};

export default ListIndexProvider;
