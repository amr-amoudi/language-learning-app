'use client';

import DecksSlider from "@/app/words/components/DecksSlider";
import {buttonClasses} from "@/app/lib/reuse-classes";
import {ActionResult, Deck} from "@/app/lib/types";
import React, {Dispatch, SetStateAction} from "react";
import PhoneModal from "@/app/components/PhoneModal";
import CreateDeckFormElements from "@/app/components/CreateDeckFormElements";
import CreateCardLayout from "@/app/words/components/CreateCardLayout";


export default function DecksContent({ decks }: { decks: Deck[] }) {
    const [current,setCurrent] = React.useState({
        decks: decks,
        isOpen: false,
        modalHtml: <></>
    });

    function updateDecksState(data: ActionResult ) {
        setCurrent(prev => {
            return ({ ...prev, decks: [(data.successValue as Deck[])[0], ...current.decks]})
        })
    }

    function openModal() {
        setCurrent(prev => (
            { ...prev,
                isOpen: true,
                modalHtml: <CreateDeckFormElements updateDecksState={updateDecksState}></CreateDeckFormElements>
            }));
    }

    function closeModal(){
        setCurrent(prev => ({ ...prev, isOpen: false }));
    }

    return (
        <>
            {/* create new deck button */}
            <div className={`w-full z-4 my-8 mx-auto text-center flex justify-center items-center relative text-semibold
                      ${current.decks.length === 0 ? 'h-screen ' : ''}`}>
                <button className={`${buttonClasses} ${current.decks.length === 0 ? 'absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2' : ''}`} onClick={openModal}>Create New Deck</button>
            </div>

            {/* deck slider */}
            {current.decks.length > 0 && <DecksSlider decks={current.decks}></DecksSlider>}

            <PhoneModal height={'h-[40%]'} isOpen={current.isOpen} closeStateFun={closeModal as Dispatch<SetStateAction<boolean>>}>
                {current.modalHtml}
            </PhoneModal>

            <CreateCardLayout/>
        </>
    )
}


