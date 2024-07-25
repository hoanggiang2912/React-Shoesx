import { createContext, useContext, useState } from "react";

// Create a new context
export const StatusContext = createContext();

// Create a provider component
export const StatusProvider = ({ children }) => {
  // Define the initial state
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  // Define any functions or state updates you need
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const setError = (message) => {
    setIsError(true);
    setMessage(message);
  };
  const clearError = () => {
    setIsError(false);
    setMessage("");
  };
  // Return the provider with the context value
  return (
    <StatusContext.Provider
      value={{
        isLoading,
        isError,
        message,
        startLoading,
        stopLoading,
        setError,
        clearError,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

const useStatus = () => {
  const context = useContext(StatusContext);
  if (context)
    throw new Error("useStatus must be used within a StatusProvider");

  return context;
};

export default useStatus;
