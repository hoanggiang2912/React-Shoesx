import { createContext, useContext, useReducer } from "react";

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

    default:
      throw new Error("Action type is unknow!");
  }
};
const CartContext = createContext();

function CartProvider({ children }) {
  const [{ isOpenCart, isOpenSidebar }, dispatch] = useReducer(
    reducer,
    initialStates
  );

  return (
    <CartContext.Provider
      value={{
        isOpenCart,
        isOpenSidebar,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
