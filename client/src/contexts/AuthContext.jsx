import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

// Ensures cookie is sent
axios.defaults.withCredentials = true;
const serverUrl = import.meta.env.REACT_APP_SERVER_URL;

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/auth/logged_in`);
      setLoggedIn(logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

const AuthRoute = ({ element, ...rest }) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  if (loggedIn === null) return null;

  if (loggedIn === false) {
    navigate("/user/login");
    return null;
  }

  return element;
};

export { AuthContextProvider, useAuth, AuthRoute };
