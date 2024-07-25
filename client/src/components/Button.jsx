import { useNavigate } from "react-router-dom";

function Button({ children, className, onClick, disabled, size, href }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (href) {
          navigate(href);
        }
        if (onClick) {
          onClick();
        }
      }}
      disabled={disabled}
      className={`btn ${
        !size && "p-3"
      } bg-black rounded-full text-white flex justify-center items-center ease-in duration-200 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
