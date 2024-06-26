import styles from "./Button.module.css";

function Button({ children, className, onClick, disabled, size }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${
        !size && "p-3"
      } bg-black rounded-full text-white flex justify-center items-center ease-in duration-200 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
