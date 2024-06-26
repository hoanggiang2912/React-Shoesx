import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import styles from "./SearchBox.module.css";
import { motion } from "framer-motion";
import Button from "./Button";

function SearchBox({ isOpenSearchBox, setIsOpenSearchBox }) {
  return (
    <motion.div
      className={`searchBoxOverlay fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 backdrop-blur-sm z-20 flex justify-center pt-40 ${
        isOpenSearchBox ? "flex" : "hidden"
      }`}
      animate={{
        opacity: isOpenSearchBox ? 1 : 0,
        zIndex: isOpenSearchBox ? 20 : 0,
        translateY: isOpenSearchBox ? 0 : 100,
      }}
    >
      <Button
        className="absolute z-10 bg-opacity-0 hover:bg-opacity-15 top-8 right-8"
        onClick={(isOpenSearchBox) => setIsOpenSearchBox(!isOpenSearchBox)}
      >
        <FaXmark />
      </Button>
      <div className={`${styles.searchBoxInner}`}>
        <form
          action="#"
          className="form searchForm flex items-center border rounded-full px-5 py-3 max-w-full shadow-md text-white bg-gray-200 backdrop-blur-sm bg-opacity-10"
        >
          <input
            type="text"
            name="search"
            id="search"
            className="searchInput max-w-full text-white flex-1 placeholder-neutral-200 outline-none"
            placeholder="Search for shoes..."
          />
          <button type="submit" className="searchButton">
            <FaMagnifyingGlass />
          </button>
        </form>
        <div className="suggestions mt-10">
          <h2 className="text-xl text-white">Suggests for you</h2>
          <ul className="flex flex-wrap gap-5 mt-5">
            <li className="p-3 text-white border-none bg-slate-600 rounded-full transition hover:bg-slate-400 w-fit ">
              Suggestion 1
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchBox;
