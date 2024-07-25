import { motion } from "framer-motion";
import { useMemo } from "react";
import { MdCheck, MdError } from "react-icons/md";

const FormMessage = ({ message, isError }) => {
  const tailwindError = "text-red-500 bg-red-100";
  const tailwindSuccess = "text-green-500 bg-green-100";

  const framer_error = useMemo(
    () => ({
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
      transition: { duration: 0.2 },
    }),
    []
  );

  return (
    <motion.p
      className={`absolute top-2 left-2 right-2 flex items-center gap-1 p-2 font-semibold rounded-md ${
        isError ? tailwindError : tailwindSuccess
      }`}
      {...framer_error}
    >
      {isError ? <MdError /> : <MdCheck />}
      {message}
    </motion.p>
  );
};

export default FormMessage;
