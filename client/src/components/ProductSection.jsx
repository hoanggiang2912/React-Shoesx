import Button from "./Button";
import Product from "./Product";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useRef } from "react";
import Section from "./Section";

function ProductSection({ className, title, products, url, superTitle }) {
  const sliderRef = useRef();

  return (
    <Section className={className}>
      {superTitle && (
        <div className="title mb-12 flex justify-center flex-col items-center">
          <h1 className="text-3xl font-regular text-center leading-5-">
            Explore Our Products
          </h1>
          <p className="text-sm text-slate-400 mt-3 text-center max-w-96">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            vel est earum quasi unde aperiam nesciunt dolorem nisi
          </p>
        </div>
      )}

      <div className="title flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <div className="w-1 h-6 block shrink-0 bg-indigo-400"></div>
          <h1 className="text-3xl font-bold uppercase">{title}</h1>
        </div>
        <div className="flex gap-2 sliderButtons">
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
      </div>

      <div className="mt-8">
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
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Product product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-10 flex justify-center">
        <Button url={url} className="px-5">
          View All
        </Button>
      </div>
    </Section>
  );
}

export default ProductSection;
