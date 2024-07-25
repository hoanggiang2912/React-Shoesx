import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { findInputError, isFormInvalid } from "../utils/util";
import { useState } from "react";

export default function Input({
  onChange,
  value,
  multiline,
  inputClassName,
  labelClassName,
  label,
  type,
  id,
  placeholder,
  name,
  validation,
  isShowLabel = false,
  togglePassword = false,
  buttonClassname,
}) {
  const [inputType, setInputType] = useState(type);

  const onTogglePassword = () => {
    setInputType((type) => (type === "password" ? "text" : "password"));
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="flex flex-col w-full gap-2">
      {isShowLabel && (
        <label htmlFor={id} className={`${labelClassName} capitalize`}>
          {label}
        </label>
      )}
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      {multiline ? (
        <textarea
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          className={inputClassName}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <div className="relative">
          <input
            onChange={onChange}
            value={value}
            type={inputType}
            id={id}
            name={name}
            placeholder={placeholder}
            className={inputClassName}
            {...register(name, validation)}
          />
          {togglePassword && (
            <button
              onClick={onTogglePassword}
              className={`absolute top-2 translate-y-2/4 right-4 ${buttonClassname}`}
            >
              {inputType === "password" ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
