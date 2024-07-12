import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import useKey from "../hooks/useKey";

function Overlay({ children, isOpen, close }) {
  useKey("Escape", close);

  return (
    <motion.div
      className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-90 backdrop-blur-sm transition-all flex items-center justify-center"
      initial={{
        opacity: 0,
        translateY: "-100%",
        visibility: "hidden",
      }}
      animate={{
        opacity: isOpen ? 1 : 0,
        translateY: isOpen ? 0 : "-100%",
        visibility: isOpen ? "visible" : "hidden",
      }}
      onClick={close}
    >
      <button
        className="p-3 flex items-center justify-center absolute hover:bg-gray-700 transition rounded-full text-white top-5 right-5"
        onClick={close}
      >
        <AiOutlineClose />
      </button>

      {children}
    </motion.div>
  );
}

export default Overlay;
