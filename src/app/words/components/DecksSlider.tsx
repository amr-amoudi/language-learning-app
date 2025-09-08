"use client"

import { Deck } from "@/app/lib/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Keyboard } from 'swiper/modules';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeckName from "@/app/words/components/DeckName";
import Image from "next/image";
import pencil from "@/app/assets/pencil.svg";
import PhoneModal from "@/app/components/PhoneModal";
import OnSuccess from "@/app/components/OnSuccess";
import UpdateFormModal from "@/app/components/UpdateFormModal";
import UpdateAndDeleteDeckModal from "@/app/components/UpdateAndDeleteDeckModal";

export default function DecksSlider({ decks }: { decks: Deck[] }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const router = useRouter()

    // the request of the words is delayed to wait for the user's selection
    useEffect(() => {
        if (currentIndex !== undefined) {
            const timeOut = setTimeout(() => {
                router.push(`/words/${decks[currentIndex].id}`)
            }, 400)

            return () => clearTimeout(timeOut)
        }
    }, [decks, currentIndex, router])

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
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={50}
        keyboard={{ enabled: true }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="h-[40px] w-full text-center"
      >
        {decks.map((deck) => (
          <SwiperSlide
            className="text-app_yellow text-center text-3xl text-shadow-app_orange text-shadow-2xs z-2  flex flex-col items-center justify-center relative"
            key={deck.id}
          >
            <DeckName>{deck.name.slice(0,5)}</DeckName>
              <button onClick={() => setDisplayModal(true)} className={'absolute top-0 left-[-10px] flex justify-center items-center h-fit'}>
                  <Image width={15} height={10} className={'rotate-90'} src={pencil} alt="edit"/>
              </button>
          </SwiperSlide>
        ))}
      </Swiper>

        <PhoneModal height={"h-[40%]"} isOpen={displayModal} closeModalState={() => setDisplayModal(false)} >
            <UpdateAndDeleteDeckModal deckName={decks[currentIndex].name}/>
        </PhoneModal>
    </div>
  );
}
