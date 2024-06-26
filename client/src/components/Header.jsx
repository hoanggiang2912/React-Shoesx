import { GoMail } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import {
  FaAlignLeft,
  FaMagnifyingGlass,
  FaPhone,
  FaXmark,
} from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import CartPopup from "./CartPopup";
import SearchBox from "./SearchBox";
import { useCart } from "../contexts/CartContext";
import HeaderSidebar from "./HeaderSidebar";

function Header() {
  const { dispatch } = useCart();
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);

  return (
    <>
      <header className="bg-gray-900 px-48 py-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <address className="text-white text-sm flex items-center gap-1">
              <GoMail />: hohoanggiang80@gmail.com
            </address>
            <span className="text-white">|</span>
            <address className="text-white text-sm flex items-center gap-1">
              <FaPhone />: 0938 000 000
            </address>
          </div>
          <Button className="!w-fit !bg-white !text-black hover:bg-gray-700 gap-2">
            <FaMagnifyingGlass /> Find your shoes
          </Button>
        </div>
      </header>
      <header className="text-gray-600 body-font">
        <CartPopup />
        <HeaderSidebar />
        <SearchBox />
        <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center lg:px-48 md:px-20">
          <Button
            className="mr-5 !hover:bg-opacity-700"
            onClick={() => dispatch({ type: "openSidebar" })}
          >
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
            <Button className="px-3 !hover:bg-opacity-700">
              <FaRegCircleUser />
            </Button>
            <Button
              className="px-3 !hover:bg-opacity-700"
              onClick={() => dispatch({ type: "openCart" })}
            >
              <FaCartShopping />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
