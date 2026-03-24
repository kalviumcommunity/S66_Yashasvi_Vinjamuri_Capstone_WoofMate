import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const ImageCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/carousel`);
        setImages(response.data.map(img => img.imageUrl));
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };
    fetchImages();
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="relative z-10 bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Here are some <span className="text-[#5F5BD7]">cute dogs</span> for you to see
        </h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        freeMode={true}
        allowTouchMove={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={3000}
        grabCursor={true}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 5 },
        }}
        className="continuous-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-2xl shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .continuous-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default ImageCarousel;
