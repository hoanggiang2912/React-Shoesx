import styles from "./TabProducts.module.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Product from "./Product";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import Button from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Section from "./Section";

function TabProducts() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Kids");
  const [isLoading, setIsLoading] = useState(false);

  const sliderRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/v1/categories/parent")
      .then((response) => {
        // console.log(response.data);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Section>
      <div className="flex gap-1 items-center justify-center">
        <h1 className="text-3xl font-bold uppercase text-center">
          Our Categories
        </h1>
      </div>
      <Tabs className="mt-10">
        <TabList className="flex !justify-between items-center">
          <div className="flex gap-4">
            {categories.map((category) => (
              <Tab
                onChange={() => setActiveCategory(category.name)}
                key={category._id}
                className="bg-indigo-400 rounded-full w-fit"
              >
                {category.name}
              </Tab>
            ))}
          </div>
          <div className="flex gap-4">
            <Button
              className="swiper-button-prev"
              onClick={() => sliderRef.current?.slideNext()}
            >
              <FaAngleLeft />
            </Button>
            <Button
              className="swiper-button-next"
              onClick={() => sliderRef.current?.slidePrev()}
            >
              <FaAngleRight />
            </Button>
          </div>
        </TabList>

        <TabPanels>
          {categories.length > 0 &&
            !isLoading &&
            categories.map((category) => (
              <TabPanel key={category._id}>
                <Swiper
                  spaceBetween={8}
                  slidesPerView={4}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    // when window width is >= 320px
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    // when window width is >= 480px
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    // when window width is >= 640px
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 32,
                      slidesPerGroup: 1,
                    },
                    1336: {
                      slidesPerView: 4,
                      spaceBetween: 32,
                    },
                  }}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                >
                  {category.products.map((product) => (
                    <SwiperSlide key={product._id}>
                      <Product product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex justify-center mt-8">
                  <Button className="px-5">See more</Button>
                </div>
              </TabPanel>
            ))}
        </TabPanels>
      </Tabs>
    </Section>
  );
}

export default TabProducts;
