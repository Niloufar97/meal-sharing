import React from "react";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSWR from "swr";
import SwiperContent from "../swiperContent/SwiperContent.js";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/meals/bestsellers",
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(data);
  return (
    <>
      <section className="hero">
        <h2>EAT, DRINK & BE HAPPY</h2>
        <img src="src\client\assets\images\hero.jpg" alt="My Image" />
      </section>
      <section className="popular">
        <h1>THE MOST POPULAR THIS WEEK</h1>
        <Swiper 
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          loop={true}
        >
          {data.data.map((item) => (
            <SwiperSlide key={item.id} className="swiperSlide">
              <SwiperContent data={item}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default Home;
