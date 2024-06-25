import styles from "./Button.module.css";

function Button({ children, className }) {
  return (
    <button
      className={`btn p-3 bg-primaryColor rounded-full text-white flex justify-center items-center hover:bg-gray-800 ease-in duration-200 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
