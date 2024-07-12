import { useEffect } from "react";

const useKey = (key, action) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === key) {
        action();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [key, action]);
};

export default useKey;
