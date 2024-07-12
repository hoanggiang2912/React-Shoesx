import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";
import Overlay from "./Overlay";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function LoginForm({ isOpen, close, switcher }) {
  return (
    <Overlay isOpen={isOpen} close={close}>
      <motion.div
        className="flex w-[750px] rounded-xl overflow-hidden bg-white shadow-2xl"
        animate={{
          opacity: isOpen ? 1 : 0,
          translateY: isOpen ? 0 : "-100%",
          visibility: isOpen ? "visible" : "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 p-5 bg-black relative flex items-center">
          <img
            src="../../src/assets/loginholo.svg"
            alt=""
            className={"absolute z-8 transform scale-125"}
          />
          <form
            action="#"
            id="loginForm"
            className="relative z-10 bg-white backdrop-blur-md bg-opacity-10 p-5 rounded-xl shadow-xl flex-1"
          >
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <p className="text-white mt-2">
              Didn&apos;t have an account yet?{" "}
              <span
                onClick={switcher}
                className="text-white underline hover:text-gray-300 transition cursor-pointer"
              >
                Create one
              </span>
            </p>
            <div className="mt-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="form-input"
              />
            </div>
            <div className="mt-4">
              <div className="text-center text-gray-400">
                Or Social Accounts
              </div>
              <button className="bg-transparent border border-solid text-white mt-4 w-full py-2 rounded-full hover:bg-white transition hover:border-transparent hover:backdrop-blur-md hover:bg-opacity-20 flex items-center justify-center gap-2">
                <FaFacebook></FaFacebook> Facebook
              </button>
              <button
                className="bg-transparent border border-solid text-white mt-4 w-full py-2 rounded-full hover:bg-white transition hover:border-transparent hover:backdrop-blur-md hover:bg-opacity-20 flex items-center justify-center gap-2"
                onClick={(e) => e.preventDefault()}
              >
                <FaGoogle></FaGoogle>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </button>
            </div>
            <div className="mt-4">
              <button className="bg-black text-white w-full py-2 rounded-full gap-2 flex items-center justify-center hover:backdrop-blur-xl hover:bg-opacity-80 transition">
                <AiOutlineLogin></AiOutlineLogin> Login
              </button>
            </div>
          </form>
        </div>
        <div className="relative w-1/2">
          <img
            src="../../src/assets/loginabstractbanner.svg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="text-top flex items-center  absolute z-20 top-5 left-5 right-5 gap-4">
            <span className="text-white text-nowrap font-pacifico text-md w-max">
              Since 2024
            </span>
            <span className="w-full h-[1px] bg-white"></span>
          </div>
          <div className="text-top flex items-center  absolute z-20 bottom-5 left-5 right-5 justify-end">
            <span className="text-white text-nowrap font-pacifico text-md w-max">
              Design by Hoang Giang
            </span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-6xl font-pacifico leading-snug [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]">
              Welcome Back
            </h1>
            <p className="mt-2">
              To keep connected with us please login with your personal info
            </p>
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
}

export default LoginForm;
