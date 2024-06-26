import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./HeroProducts.module.css";

const heroProducts = [
  {
    id: 1,
    name: "Tatum 2 'Vortex' PF",
    image: "https://i.ibb.co/9r8Jyd5/image.png",
    price: 3669000,
  },
  {
    id: 2,
    name: "Luka 2",
    image:
      "https://i.ibb.co/NKpKrg4/jordan-brand-launches-luka-2-basketball-shoe.jpg",
    price: 3669000,
  },
  {
    id: 3,
    name: "Air Jordan XXXVIII",
    image:
      "https://i.ibb.co/CBYnwc0/jordan-brand-launches-the-air-jordan-xxxviii.jpg",
    price: 3669000,
  },
];

function HeroProducts() {
  const [activeId, setActiveId] = useState(2);

  return (
    <div
      className={`flex items-center gap-5 mt-10 ${styles.heroProductContainer}`}
    >
      {heroProducts.map((product) => (
        <motion.div
          key={product.id}
          className={`flex flex-col items-center h-full relative transition flex-1 cursor-pointer ${
            activeId == product.id ? styles.productActive : ""
          }`}
          onMouseEnter={() => setActiveId(product.id)}
          animate={{
            flexBasis: activeId == product.id ? "40%" : "10%",
            duration: 5,
          }}
        >
          <div
            className="overflow-hidden relative w-full h-full rounded-xl"
            style={{ minHeight: "600px", height: "600%" }}
          >
            <div
              className={`transform hover:scale-105 duration-300 ease-in-out absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center`}
              style={{ backgroundImage: `url('${product.image}')` }}
            />
          </div>
          <div className="absolute top-4 left-4 right-4 text-white flex justify-between">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-lg">{product.price} VND</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default HeroProducts;
