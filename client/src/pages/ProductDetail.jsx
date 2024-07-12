import { useParams } from "react-router-dom";
import ClientLayout from "../components/ClientLayout";
import Section from "../components/Section";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCurrency } from "../utils/util";
import { useCart } from "../contexts/CartContext";

function ProductDetail() {
  const { dispatch } = useCart();

  const { idProduct } = useParams("idProduct");
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [background, setBackground] = useState(product.background);

  // Calculate discounted price outside JSX for clarity
  const hasSale = product?.salePrice > 0;
  const discountedPrice = hasSale
    ? formatCurrency(
        Number(product?.price) -
          Number((product?.price * product?.salePrice) / 100)
      )
    : null;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const url = `http://localhost:3000/api/v1/products/${idProduct}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.products);
          setProduct(res.data.products);
          setVariants([
            ...res.data.products.variants,
            {
              id: res.data.products._id,
              background: res.data.products.background,
              thumbnails: res.data.products.thumbnails,
              price: res.data.products.price,
              salePrice: res.data.products?.salePrice,
            },
          ]);
          // console.log(variants);
          // console.log(product);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    })();
  }, [idProduct]);

  const variantSwitch = (variant) => {
    // console.log(variant);
    setProduct((currentProduct) => {
      // Check if the variant would change the product
      const isVariantDifferent = Object.keys(variant).some(
        (key) => variant[key] !== currentProduct[key]
      );

      // Only update the product if the variant is different
      if (isVariantDifferent) {
        console.log(variant);
        setBackground(variant.background);
        return {
          ...currentProduct,
          ...variant,
        };
      }

      // Return the current product without changes to prevent an infinite loop
      return currentProduct;
    });
  };

  const backgroundSwitch = (image) => {
    setBackground(() => image);
  };

  // console.log(variants);

  return (
    <ClientLayout>
      <Section>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap relative">
              {isLoading && (
                <motion.div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
                  <Spinner />
                </motion.div>
              )}
              {!product && (
                <h1>Product can&apos;t be loaded! Please try again!</h1>
              )}
              <div className="lg:w-1/2 flex flex-col w-full lg:h-auto h-64 rounded">
                <img
                  alt="ecommerce"
                  className="lg:w-1/1 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={background || product.background}
                />
                <div className="flex mt-4">
                  <Swiper spaceBetween={8} slidesPerView={4.5}>
                    {product?.thumbnails &&
                      product.thumbnails.map((thumbnail) => (
                        <SwiperSlide
                          key={thumbnail}
                          onClick={() => backgroundSwitch(thumbnail)}
                        >
                          <img src={thumbnail} alt="" />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.idCategory?.children}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <Swiper>
                    {variants?.length > 0 &&
                      variants.map((variant) => (
                        <SwiperSlide key={variant.id} className="flex-shrink-0">
                          <div
                            className="rounded-lg w-28 h-28 overflow-hidden flex justify-center items-center pr-4 flex-shrink-0"
                            onClick={() => variantSwitch(variant)}
                          >
                            <img
                              src={variant.background}
                              alt=""
                              className="object-cover shadow-md"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  {/* <div className="flex">
                  </div> */}
                </div>
                <div className="flex items-center">
                  {hasSale ? (
                    <div className="flex flex-col">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        {discountedPrice}
                      </span>
                      <del className="title-font italic font-medium text-2xl text-gray-400">
                        {formatCurrency(product.price)}
                      </del>
                    </div>
                  ) : (
                    <span className="title-font font-medium text-2xl text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                  <button
                    className="flex ml-auto text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 items-center rounded-full h-fit"
                    onClick={() =>
                      dispatch({ type: "addToCart", payload: product })
                    }
                  >
                    <FaCartPlus className="mr-2" />
                    Add to cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Section>
    </ClientLayout>
  );
}

export default ProductDetail;
