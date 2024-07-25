import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { formatCurrency } from "../utils/util";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

function CartProduct({ product }) {
  const { _id, title, background, idCategory, price, salePrice, qty } = product;

  const finalPrice = salePrice ? price - (salePrice * price) / 100 : price;

  const { dispatch } = useCart();

  const onChangeValue = (e) => {
    dispatch({ type: "updateQty", payload: { _id, qty: e.target.value } });
  };

  return (
    <div className="cart-product flex justify-between mt-5">
      <div className="flex gap-3">
        <div
          className="cart-product-image relative rounded-lg overflow-hidden"
          style={{
            paddingTop: "22%",
            borderRadius: "10px",
            width: "100px",
          }}
        >
          <div
            className="common-banner bg-contain"
            style={{
              backgroundImage: `url(${background})`,
            }}
          ></div>
        </div>
        <div className="cart-product-info">
          <h2 className="text-base font-semibold capitalize">{title}</h2>
          <p className="text-gray-500 leading-10">{idCategory.children}</p>
          <div className="cart-product-quantity flex items-center">
            <button
              className="icon-btn small"
              onClick={() => dispatch({ type: "decreaseQty", payload: _id })}
            >
              <FaMinus />
            </button>
            <input
              onChange={onChangeValue}
              type="number"
              value={qty}
              className="text-center w-10 h-full outline-none"
            />
            <button
              className="icon-btn small"
              onClick={() => dispatch({ type: "increaseQty", payload: _id })}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-col items-center">
        {!salePrice ? (
          <span className="text-base font-semibold">
            {formatCurrency(price)}
          </span>
        ) : (
          <>
            <span className="text-base font-semibold">
              {formatCurrency(price - (salePrice * price) / 100)}
            </span>
            <del className="text-sm text-gray-400">{formatCurrency(price)}</del>
          </>
        )}
      </div>
      <div className="cart-product-price flex flex-col items-end">
        <h2 className="text-xl font-bold">
          {formatCurrency(finalPrice * qty)}
        </h2>
        <button
          className="cart-product-remove-btn p-4 hover:bg-slate-200 hover:text-red-400 rounded-full"
          onClick={() => dispatch({ type: "removeFromCart", payload: _id })}
        >
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
