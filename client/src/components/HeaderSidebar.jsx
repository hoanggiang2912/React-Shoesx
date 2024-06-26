import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";
import styles from "./HeaderSidebar.module.css";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function HeaderSidebar({ openSearchBox }) {
  const { isOpenSidebar, dispatch } = useCart();

  return (
    <motion.div
      onClick={() => dispatch({ type: "closeSidebar" })}
      className={`sidebarOverlay fixed top-0 bottom-0 left-0 -right-96 bg-opacity-20 bg-black backdrop-blur-sm justify-start z-10 ${
        isOpenSidebar ? "flex" : "hidden"
      }`}
      animate={{
        opacity: isOpenSidebar ? 1 : 0,
      }}
    >
      <motion.div
        className={`${styles.sidebarBox} rounded-lg bg-white shadow-md flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        animate={{
          x: isOpenSidebar ? 0 : -400,
        }}
      >
        <div className="title flex items-center justify-end p-5">
          <Button
            onClick={() => dispatch({ type: "closeSidebar" })}
            className="bg-opacity-0 !text-black hover:bg-opacity-10"
          >
            <FaXmark />
          </Button>
        </div>
        <div className="sidebarContent flex flex-col items-center p-5 flex-1 overflow-y-auto">
          <Button
            className="!w-fit hover:bg-gray-700 mb-10 gap-2"
            onClick={openSearchBox}
          >
            <FaMagnifyingGlass /> Find your shoes
          </Button>
          <NavLink className="hover:text-gray-900 text-4xl underline tac mb-10 flex items-center justify-center">
            Home
          </NavLink>
          <NavLink className="hover:text-gray-900 text-4xl underline tac mb-10 flex items-center justify-center">
            Shop
          </NavLink>
          <NavLink className="hover:text-gray-900 text-4xl underline tac mb-10 flex items-center justify-center">
            Contact
          </NavLink>
          <NavLink className="hover:text-gray-900 text-4xl underline tac mb-10 flex items-center justify-center">
            About us
          </NavLink>
          <NavLink className="hover:text-gray-900 text-4xl underline tac mb-10 flex items-center justify-center">
            Login
          </NavLink>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HeaderSidebar;
