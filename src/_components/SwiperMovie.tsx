"use client";
import { RootApiFilmBySearch } from "@/_interfaces/DataFilmBySearch";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieItem } from "./MovieItem";
import RootApiFilmBySlug from "@/_interfaces/DataFilmBySlug";
import RootApiFilmNewUpdate from "@/_interfaces/DataFilmNewUpdateProps";

export function SwiperMovie({
  dataList,
}: {
  dataList: RootApiFilmBySearch | RootApiFilmBySlug | RootApiFilmNewUpdate;
}) {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {dataList.items.map((item) => (
        <SwiperSlide key={item.name}>
          <MovieItem className="w-full" item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
