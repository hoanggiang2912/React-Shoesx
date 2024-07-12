import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Feedback from "./Feedback";

function Feedbacks() {
  return (
    <div>
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Customer Feedbacks
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Some of the feedbacks we have received from our customers.
        </p>
      </div>
      <div className="feedback-wrapper">
        <Swiper
          spaceBetween={50}
          slidesPerView={3.5}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
        >
          <SwiperSlide>
            <Feedback />
          </SwiperSlide>
          <SwiperSlide>
            <Feedback />
          </SwiperSlide>
          <SwiperSlide>
            <Feedback />
          </SwiperSlide>
          <SwiperSlide>
            <Feedback />
          </SwiperSlide>
          <SwiperSlide>
            <Feedback />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Feedbacks;
