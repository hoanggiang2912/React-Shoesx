import { NavLink } from "react-router-dom";
import Button from "./Button";
import { FaAlignLeft } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useReducer } from "react";

const initialStates = {
  isOpenCart: false,
  isOpenSidebar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openCart":
      return {
        ...state,
        isOpenCart: true,
      };

    default:
      throw new Error("Action type is unknow!");
  }
};

function Header() {
  const [{ isOpenCart, isOpenSidebar }, dispatch] = useReducer(
    reducer,
    initialStates
  );

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center lg:px-48 md:px-20">
        <Button className="mr-5">
          <FaAlignLeft />
        </Button>
        <NavLink
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src="../../src/assets/Shoesx.svg" alt="" />
        </NavLink>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink className="mr-14 hover:text-gray-900">Home</NavLink>
          <NavLink className="mr-14 hover:text-gray-900">Shop</NavLink>
          <NavLink className="mr-14 hover:text-gray-900">Contact</NavLink>
          <NavLink className="mr-14 hover:text-gray-900">About us</NavLink>
        </nav>
        <div className="flex items-center gap-5">
          <Button className="px-3">
            <FaRegCircleUser />
          </Button>
          <Button className="px-3">
            <FaCartShopping />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
