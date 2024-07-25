import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";
import styles from "./CartPopup.module.css";
import CartProductPopup from "./CartProductPopup";
import { formatCurrency } from "../utils/util";
import useKey from "../hooks/useKey";

function CartPopup() {
  const { isOpenCart, dispatch, cart, cartTotal, cartQty } = useCart();
  useKey("Escape", () => dispatch({ type: "closeCart" }));

  return (
    <motion.div
      onClick={() => dispatch({ type: "closeCart" })}
      className={`cartOverlay fixed top-0 bottom-0 left-0 -right-96 bg-opacity-20 bg-black backdrop-blur-sm p-5 justify-end z-10 ${
        isOpenCart ? "flex" : "hidden"
      }`}
      animate={{
        opacity: isOpenCart ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          x: isOpenCart ? -400 : 0,
        }}
        className={`${styles.cartBox} rounded-lg bg-white shadow-md flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title flex items-center justify-between p-5">
          <h2 className="text-3xl text-gray-900 font-semibold capitalize">
            cart
          </h2>
          <Button
            onClick={() => dispatch({ type: "closeCart" })}
            type="transparent"
            className="bg-opacity-0 !text-black hover:bg-opacity-10"
          >
            <FaXmark />
          </Button>
        </div>
        {cart && cart.length > 0 ? (
          <div className="cart-product-wrapper flex flex-col p-5 flex-1 overflow-y-auto">
            {cart.map((product) => (
              <CartProductPopup key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-lg text-gray-900 font-semibold p-5 flex-1 mx-auto">
              Your cart is empty!
            </h2>
          </>
        )}
        <div className="cartFooter border-t border-gray-100">
          <div className="flex justify-between p-5">
            <div className="flex items-center gap-1">
              <h3 className="text-lg text-gray-900 font-semibold">Total</h3>
              <span className="text-sm font-regular">
                ({cartQty} {cartQty > 1 ? "items" : "item"})
              </span>
            </div>
            <h3 className="text-lg text-gray-900 font-semibold">
              {formatCurrency(cartTotal)}
            </h3>
          </div>
          <div className="px-5 pb-5">
            <Button
              href={cart.length > 0 ? "/cart/checkout" : null}
              className="w-full p-3 bg-primaryColor text-white"
            >
              Checkout
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CartPopup;
