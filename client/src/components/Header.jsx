import { FaUserPlus } from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  FaAlignLeft,
  FaMagnifyingGlass,
  FaPhone,
  FaXmark,
} from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import React, { Suspense, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Loader from "./Loader";

const LazyLoginForm = React.lazy(() => import("./LoginForm"));
const LazyRegisterForm = React.lazy(() => import("./RegisterForm"));
const LazySearchBox = React.lazy(() => import("./SearchBox"));
const LazyHeaderSidebar = React.lazy(() => import("./HeaderSidebar"));
const LazyCartPopup = React.lazy(() => import("./CartPopup"));

function Header() {
  const { dispatch, cartQty } = useCart();
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const [isOpenUserDropdown, setIsOpenUserDropdown] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);

  const formSwitcher = () => {
    setIsOpenLoginForm(!isOpenLoginForm);
    setIsOpenRegisterForm(!isOpenRegisterForm);
  };

  const closeLoginForm = () => {
    setIsOpenLoginForm(false);
  };

  const openLoginForm = () => {
    setIsOpenLoginForm(true);
  };

  const closeRegisterForm = () => {
    setIsOpenRegisterForm(false);
  };

  const openRegisterForm = () => {
    setIsOpenRegisterForm(true);
  };

  const openSearchBox = () => {
    setIsOpenSearchBox(true);
  };

  const { scrollY } = useScroll();
  const headerRef = useRef();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("page scroll", latest);
    const header = headerRef.current;
    if (latest > 600) {
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  });

  return (
    <div className="relative">
      <Suspense fallback={<Loader />}>
        <LazyCartPopup />
        <LazyHeaderSidebar openSearchBox={openSearchBox} />
        <LazySearchBox
          isOpenSearchBox={isOpenSearchBox}
          setIsOpenSearchBox={setIsOpenSearchBox}
        />
        <LazyLoginForm
          isOpen={isOpenLoginForm}
          close={closeLoginForm}
          switcher={formSwitcher}
        />
        <LazyRegisterForm
          isOpen={isOpenRegisterForm}
          close={closeRegisterForm}
          switcher={formSwitcher}
        />
      </Suspense>
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
          <Button
            className="!w-fit !bg-white !text-black hover:bg-gray-700 gap-2"
            onClick={openSearchBox}
          >
            <FaMagnifyingGlass /> Find your shoes
          </Button>
        </div>
      </header>

      <header className="header text-gray-600 body-font">
        <motion.div
          ref={headerRef}
          className="mx-auto flex py-5 flex-col md:flex-row items-center lg:px-48 md:px-20"
        >
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
          <nav className="md:ml-auto md:mr-auto flex lg:flex flex-wrap items-center text-base justify-center md:hidden">
            <NavLink to="/" className="mr-14 hover:text-gray-900">
              Home
            </NavLink>
            <NavLink to="/shop" className="mr-14 hover:text-gray-900">
              Shop
            </NavLink>
            <NavLink to="/contact" className="mr-14 hover:text-gray-900">
              Contact
            </NavLink>
            <NavLink to="/about-us" className="mr-14 hover:text-gray-900">
              About us
            </NavLink>
          </nav>
          <div className="flex items-center gap-5">
            <Button
              className="px-3 !hover:bg-opacity-700 relative"
              onClick={() => setIsOpenUserDropdown(!isOpenUserDropdown)}
            >
              <FaRegCircleUser />
              <div
                id="userOptionDropdown"
                className={`dropdown absolute bg-black z-10 top-10 right-0 w-40 p-2 rounded-md shadow-lg transition-all ${
                  isOpenUserDropdown
                    ? "bg-opacity-100 visible"
                    : "bg-opacity-0 invisible"
                }`}
              >
                <div className="dropdown-content flex flex-col">
                  <NavLink
                    onClick={openLoginForm}
                    className="dropdown-item p-2 hover:bg-slate-950 rounded-md transition-all flex items-center justify-center gap-2"
                  >
                    <AiOutlineLogin />
                    Login
                  </NavLink>
                  <NavLink
                    onClick={openRegisterForm}
                    className="dropdown-item p-2 hover:bg-slate-950 rounded-md transition-all flex items-center gap-2 justify-center"
                  >
                    <FaUserPlus /> Register
                  </NavLink>
                </div>
              </div>
            </Button>
            <Button
              className="px-3 !hover:bg-opacity-700 relative"
              onClick={() => dispatch({ type: "openCart" })}
            >
              <FaCartShopping />
              <span className="bg-indigo-500 bg-opacity-90 rounded-full p-2 text-white text-sm w-[18px] h-[18px] flex items-center justify-center flex-shrink-0 absolute -top-2 -right-1">
                {cartQty}
              </span>
            </Button>
          </div>
        </motion.div>
      </header>
    </div>
  );
}

export default Header;
