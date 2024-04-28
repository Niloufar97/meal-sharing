import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSWR from "swr";
import SwiperContent from '../swiperContent/SwiperContent.js'
import './swiper.css'

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

export default function MySwiper() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/meals/bestsellers",
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(data);

  return (
    <section className="popular">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        loop={true}
      >
        {data?.data.map((item, index) => (
          <SwiperSlide key={item.id || index} className="swiperSlide">
            <SwiperContent data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );

}