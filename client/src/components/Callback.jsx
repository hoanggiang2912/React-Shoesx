import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { AuthContext } = useAuth();
  const serverUrl = import.meta.env.REACT_APP_SERVER_URL;

  const called = useRef(false);
  const { checkLoginState, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (loggedIn === false) {
        try {
          if (called.current) return; // prevent rerender caused by StrictMode
          called.current = true;
          const res = await axios.get(
            `${serverUrl}/auth/token${window.location.search}`
          );
          console.log("response: ", res);
          checkLoginState();
          navigate("/");
        } catch (err) {
          console.error(err);
          navigate("/");
        }
      } else if (loggedIn === true) {
        navigate("/");
      }
    })();
  }, [checkLoginState, loggedIn, navigate]);
  return <></>;
};
