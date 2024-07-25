import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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
    case "closeCart":
      return {
        ...state,
        isOpenCart: false,
      };
    case "openSidebar":
      return {
        ...state,
        isOpenSidebar: true,
      };
    case "closeSidebar":
      return {
        ...state,
        isOpenSidebar: false,
      };
    case "addToCart":
      return {
        ...state,
        cart: state.cart.some((i) => i._id === action.payload._id)
          ? state.cart.map((item) =>
              item._id === action.payload._id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...action.payload, qty: 1 }],
      };
    case "removeFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "increaseQty":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "decreaseQty": {
      // First, filter out the item if its quantity is 1
      const filteredCart = state.cart.filter(
        (item) => !(item._id === action.payload && item.qty === 1)
      );

      // Then, map over the filtered cart to decrease the quantity of the item if needed
      const updatedCart = filteredCart.map((item) => {
        if (item._id === action.payload && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return item;
        }
      });

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "updateQty":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    case "clearCart":
      return {
        ...state,
        cart: [],
      };

    default:
      throw new Error("Action type is unknow!");
  }
};
const CartContext = createContext();

function CartProvider({ children }) {
  const [localCart, setLocalCart] = useLocalStorage("cart", []);

  const [{ isOpenCart, isOpenSidebar, cart }, dispatch] = useReducer(reducer, {
    ...initialStates,
    cart: localCart,
  });

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const cartQty = cart.reduce((acc, item) => (acc += item.qty), 0);
  const cartTotal = cart.reduce(
    (acc, item) =>
      (acc += item.salePrice
        ? item.price - ((item.salePrice * item.price) / 100) * item.qty
        : item.price * item.qty),
    0
  );

  // console.log(cartQty, cartTotal);

  return (
    <CartContext.Provider
      value={{
        isOpenCart,
        isOpenSidebar,
        cart,
        cartQty,
        cartTotal,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  // console.log(context);
  return context;
}

export { CartProvider, useCart };
