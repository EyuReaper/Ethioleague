import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const VideoCarousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      spaceBetween={10}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      effect="fade"
      className="rounded-lg shadow-lg"
    >
      <SwiperSlide>
        <div className="bg-black p-4 text-white text-center">
          <h3 className="text-xl">Match Highlight 1</h3>
          <video controls className="w-full">
            <source src="https://example.com/video1.mp4" type="video/mp4" />
          </video>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-black p-4 text-white text-center">
          <h3 className="text-xl">Match Highlight 2</h3>
          <video controls className="w-full">
            <source src="https://example.com/video2.mp4" type="video/mp4" />
          </video>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default VideoCarousel;
