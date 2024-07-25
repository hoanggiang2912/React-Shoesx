import { useState } from "react";
import motion from "framer-motion";

function Toast({ message, type }) {
  const [timing, setTiming] = useState(0);

  return (
    <motion.div
      className={`p-4 border ${
        type === "success"
          ? "border-green-400 bg-green-300"
          : type === "error"
          ? "border-red-400 bg-red-300"
          : "border-yellow-400 bg-yellow-300"
      } rounded-md `}
    >
      <p className="text-green-800">{message}</p>
    </motion.div>
  );
}

export default Toast;
