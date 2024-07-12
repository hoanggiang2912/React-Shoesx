import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/util";
import styles from "./Product.module.css";
import { useCart } from "../contexts/CartContext";

const variants = {
  visible: { translateY: 0 },
  hidden: { translateY: -10 },
};

function Product({ product }) {
  const { dispatch, cart } = useCart();
  // console.log(cart);

  return (
    <div className={`${styles.product} relative`}>
      <Link
        to={`/product/${product._id}`}
        className="absolute top-0 right-0 bottom-0 left-0"
      ></Link>
      <div className="">
        <div
          className="productBanner relative group hover:first:flex"
          style={{ paddingBottom: "100%" }}
        >
          <motion.div className="overlay z-8 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm transition items-center justify-center group-hover:flex hidden">
            <motion.div className="flex justify-center items-center gap-3">
              <motion.button
                initial={{ translateY: -10 }}
                animate={{
                  translateY: 0,
                }}
                className="bg-white p-3 rounded-full hover:bg-gray-400 transition"
                onClick={() => {
                  dispatch({
                    type: "addToCart",
                    payload: product,
                  });

                  console.log(cart);
                }}
              >
                <FaCartPlus />
              </motion.button>
              <motion.button
                initial={{ translateY: -10 }}
                animate={{
                  translateY: 0,
                }}
                className="bg-white p-3 rounded-full hover:bg-gray-400 transition"
              >
                <FaHeart />
              </motion.button>
              <motion.button
                initial={{ translateY: -10 }}
                animate={{
                  translateY: 0,
                }}
                className="bg-white p-3 rounded-full hover:bg-gray-400 transition"
              >
                <FaArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${product.background}')` }}
          >
            {product.salePrice ? (
              <span className="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Sale {product.salePrice}% off
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold capitalize">{product.title}</h2>
          <p className="text-md text-slate-400 capitalize">
            {product.idCategory.children}
          </p>
          <p className="text-md text-slate-500 mt-2">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
