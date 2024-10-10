import React, { createContext, useState, useContext } from "react";

// Create a context
const ButtonContext = createContext();

// Custom hook to use the ButtonContext
export const useButtonContext = () => useContext(ButtonContext);

export const ButtonProvider = ({ children }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  return (
    <ButtonContext.Provider value={{ isButtonDisabled, setIsButtonDisabled }}>
      {children}
    </ButtonContext.Provider>
  );
};
