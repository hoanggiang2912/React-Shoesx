import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { formatCurrency } from "../utils/util";

function CartProduct({ product }) {
  const { _id, title, background, idCategory, price, salePrice, qty } = product;

  const finalPrice = salePrice ? price - (salePrice * price) / 100 : price;

  return (
    <div className="cart-product flex justify-between">
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
          <h2 className="font-semibold">{title}</h2>
          <p className="text-gray-500 leading-10">{idCategory.children}</p>
          <div className="cart-product-quantity flex items-center">
            <button className="icon-btn small">
              <FaMinus />
            </button>
            <input
              type="number"
              value={qty}
              className="text-center w-10 h-full outline-none"
            />
            <button className="icon-btn small">
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-col items-center">
        {!salePrice ? (
          <span className="font-semibold">{formatCurrency(price)}</span>
        ) : (
          <>
            <span className="font-semibold">
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
        <button className="cart-product-remove-btn p-4 hover:bg-slate-200 hover:text-red-400 rounded-full">
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
