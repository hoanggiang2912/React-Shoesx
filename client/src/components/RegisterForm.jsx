import { FaC } from "react-icons/fa6";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from "../utils/inputValidations";
import { useAuth } from "../contexts/AuthContext";
import FormMessage from "./FormMessage";

function RegisterForm({ isOpen, close, switcher }) {
  const methods = useForm();
  const { isLoading, register, message, isError } = useAuth();

  const onSubmit = methods.handleSubmit((data) => register(data));

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
          <FormProvider {...methods}>
            <form
              action="#"
              id="RegisterForm"
              className="relative z-10 bg-white backdrop-blur-md bg-opacity-10 p-5 rounded-xl shadow-xl flex-1"
              onSubmit={(e) => e.preventDefault()}
            >
              {message && (
                <AnimatePresence mode="wait" initial={false}>
                  {message && (
                    <FormMessage message={message} isError={isError} />
                  )}
                </AnimatePresence>
              )}
              <h2 className="text-2xl font-bold text-white">Register</h2>
              <p className="text-white mt-2">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={switcher}
                  className="text-white underline hover:text-gray-300 transition"
                >
                  Login
                </a>
              </p>
              <div className="mt-4">
                <Input
                  labelClassName={"text-lg font-semibold "}
                  inputClassName={"form-input"}
                  {...nameValidation}
                />
              </div>
              <div className="mt-4">
                <Input
                  labelClassName={"text-lg font-semibold "}
                  inputClassName={"form-input"}
                  {...emailValidation}
                />
              </div>
              <div className="mt-4">
                <Input
                  labelClassName={"text-lg font-semibold "}
                  inputClassName={"form-input"}
                  {...phoneValidation}
                />
              </div>
              <div className="mt-4">
                <Input
                  labelClassName={"text-lg font-semibold "}
                  inputClassName={"form-input"}
                  togglePassword={true}
                  buttonClassname={"text-white"}
                  {...passwordValidation}
                />
              </div>
              <div className="mt-4">
                <span className="text-md text-center text-gray-300">
                  Forgot your password? <Link>Click here</Link>.
                </span>
              </div>
              <div className="mt-4">
                <button
                  className="bg-black text-white w-full py-2 rounded-full gap-2 flex items-center justify-center hover:backdrop-blur-xl hover:bg-opacity-80 transition"
                  onClick={onSubmit}
                >
                  {!isLoading ? (
                    <>
                      <AiOutlineUserAdd />
                      <p>Register</p>
                    </>
                  ) : (
                    <>
                      <FaC />
                      <p>Waiting for register</p>
                    </>
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
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
              Hi there!
            </h1>
            <p className="mt-2">
              Join us today <br /> and get the best experience <br /> of
              shopping online.
            </p>
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
}

export default RegisterForm;
