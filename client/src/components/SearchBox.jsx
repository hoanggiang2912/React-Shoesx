import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import styles from "./SearchBox.module.css";
import { motion } from "framer-motion";
import Button from "./Button";
import Overlay from "./Overlay";

function SearchBox({ isOpenSearchBox, setIsOpenSearchBox }) {
  const closeSearchBox = () => {
    setIsOpenSearchBox(false);
  };

  return (
    <Overlay isOpen={isOpenSearchBox} close={closeSearchBox}>
      <div
        className={`${styles.searchBoxInner}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          action="#"
          className="form searchForm flex items-center border rounded-full px-5 py-3 max-w-full shadow-md text-white backdrop-blur-xl bg-opacity-10"
        >
          <input
            type="text"
            name="search"
            id="search"
            className="searchInput max-w-full !bg-transparent text-white flex-1 outline-none"
            placeholder="Search for shoes..."
          />
          <button type="submit" className="searchButton">
            <FaMagnifyingGlass />
          </button>
        </form>
        <div className="suggestions mt-10">
          <h2 className="text-xl text-white">Suggests for you</h2>
          <ul className="flex flex-wrap gap-5 mt-5">
            <li className="p-3 text-white border-none bg-slate-600 rounded-full transition hover:bg-slate-400 w-fit cursor-pointer">
              Suggestion 1
            </li>
          </ul>
        </div>
      </div>
    </Overlay>
  );
}

export default SearchBox;
