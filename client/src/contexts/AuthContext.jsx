import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const api = "http://localhost:3000/api/v1/auth";

  const login = async (data, close) => {
    // Perform login logic here
    // console.log("data: ", data);
    // console.log("api: ", api);
    try {
      setIsLoading(true);
      const response = await axios.post(`${api}/login`, data);
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setMessage("Logged in successfully");
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setMessage("Invalid credentials");
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred");
      setError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 3000);
      setTimeout(() => {
        close();
      }, 2000);
    }
  };

  const logout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser({});

    setIsAuthenticated(false);
  };

  const register = async (data) => {
    // Perform logout logic here
    // console.log("data: ", data);
    // console.log("api: ", api);

    try {
      setIsLoading(true);
      const response = await axios.post(`${api}/register`, data);
      // console.log("response: ", response);
      if (response.status === 200) {
        setMessage("User registered successfully");
      }
    } catch (error) {
      // console.error(error);
      setMessage(error.response.data.message);
      setError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }
  };

  const updateProfile = async (id, data) => {
    // console.log("data: ", data);
    // console.log("api: ", api);

    try {
      setIsLoading(true);
      const response = await axios.patch(`${api}/update-profile/${id}`, data);
      console.log("response: ", response);

      if (response.status === 200) {
        setMessage("User updated successfully");
        const updatedUser = response.data.updatedUser;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      // console.error(error);
      setMessage(error.response.data.message);
      setError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }
  };

  const forgotPassword = async (data) => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${api}/forgot-password`, {
        email: data.email,
        id: data.id,
      });

      // console.log("response: ", response);

      if (response.data.sendMail) {
        setMessage("Email sent successfully");
      }
    } catch (error) {
      setError(true);
      setMessage(error.response.data.errorMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }
  };

  const updatePassword = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`${api}/update-password/${data.id}`, {
        password: data.password,
      });

      // console.log("response: ", response);

      if (response.data.success) {
        setMessage("Password updated successfully");
      }
    } catch (error) {
      setError(true);
      setMessage(error.response.data.errorMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        updateProfile,
        forgotPassword,
        updatePassword,
        isLoading,
        isError,
        message,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/?redirect=true&logedin=true");
    }
  }, [isAuthenticated, navigate]);
};

export default useAuth;
