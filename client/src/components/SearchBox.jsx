import styles from "./SearchBox.module.css";
import { motion } from "framer-motion";

function SearchBox({ isOpenSearchBox }) {
  return (
    <motion.div
      className={`searchBoxOverlay fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm z-10 ${
        isOpenSearchBox ? "flex" : "hidden"
      }`}
      animate={{
        opacity: isOpenSearchBox ? 1 : 0,
      }}
    ></motion.div>
  );
}

export default SearchBox;
