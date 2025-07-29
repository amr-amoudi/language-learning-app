"use client"

import { Deck } from "@/app/lib/db_types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Keyboard } from 'swiper/modules';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function DecksSlider({ decks, setCurrentDeck }: { decks: Deck[], setCurrentDeck: Dispatch<SetStateAction<string>> }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // the requist of the words is delayed to wait for the users selection
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCurrentDeck(decks[currentIndex].id)
    }, 650)

    return () => clearTimeout(timeOut)
  }, [currentIndex])

  return (
    <div className="relative w-full max-w-screen overflow-hidden">

      {/* left shadow */}
      {/* side-shadow's are in the globals.css */}
      <div
        className={`
      absolute left-0 top-0 h-full w-2 rounded-r-md z-2 
      side-shadow-left
      pointer-events-none md:hidden
      transition-all duration-300 
      ${currentIndex <= 1 ? "opacity-0 translate-x-[-5px]" : "opacity-100 translate-x-0"}
    `}
      ></div>

      {/* right shadow */}
      <div
        className={`
      absolute right-0 top-0 h-full w-2 z-2
      pointer-events-none md:hidden
      transition-all duration-300 
      rounded-l-md
      side-shadow-right
      ${currentIndex >= decks.length - 2 ? "opacity-0 translate-x-[5px]" : "opacity-100 translate-x-0"}
    `}></div>

      <Swiper
        modules={[Navigation, Keyboard]}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={100}
        keyboard={{ enabled: true }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="h-[40px] w-full"
      >
        {decks.map((deck) => (
          <SwiperSlide
            className="text-app_yellow text-center text-3xl text-shadow-app_orange text-shadow-2xs z-2"
            key={deck.id}
          >
            {deck.name}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
