import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ImageSliderMobile = ({ images }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="imgsContainer slider">
      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image && image.url} alt={image && image.name} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="sliderContainer">
        {images &&
          images.length > 1 &&
          images.map((image, index) => (
            <span
              key={index}
              className={
                activeIndex === index
                  ? "sliderLink sliderLinkActive"
                  : "sliderLink"
              }
              onClick={() => swiperRef.current.swiper.slideTo(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageSliderMobile;
