import { FaTrashCan } from "react-icons/fa6";
import Button from "./Button";
import { formatCurrency } from "../utils/util";
import { useCart } from "../contexts/CartContext";

function CartProductPopup({ product, removeable = true }) {
  const { dispatch } = useCart();

  const { _id, title, background, idCategory, price, salePrice, qty } = product;
  // console.log(qty);

  return (
    <div className="cartItem flex items-start pb-5 gap-2">
      <img
        src={background}
        alt=""
        width="80"
        height="80"
        style={{
          objectFit: "cover",
          borderRadius: "10px",
          height: "80px",
        }}
      />
      <div className="flex flex-1 flex-col flex-between h-full">
        <div className="flex flex-col">
          <h4 className="text-md capitalize font-medium text-gray">{title}</h4>
          <div className="flex-1 mt-2">
            <p className="text-md capitalize text-slate-400">
              {idCategory?.children}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {salePrice ? (
            <>
              <span className="text-md">
                {formatCurrency(price - (salePrice * price) / 100)}
              </span>
              <del className="text-md text-slate-500">
                <i>{formatCurrency(price)}</i>
              </del>
            </>
          ) : (
            ""
          )}{" "}
          {!salePrice && (
            <span className="text-md">{formatCurrency(price)}</span>
          )}
          <span className="text-md">x{qty}</span>
        </div>
      </div>
      <div className={`flex-col ${!removeable ? "hidden" : ""}`}>
        <Button
          onClick={() => dispatch({ type: "removeFromCart", payload: _id })}
          className="!text-slate-800 bg-opacity-0 hover:text-red-400 hover:bg-gray-100"
        >
          <FaTrashCan />
        </Button>
      </div>
    </div>
  );
}

export default CartProductPopup;
