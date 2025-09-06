'use client';

import DecksSlider from "@/app/words/components/DecksSlider";
import {buttonClasses} from "@/app/lib/reuse-classes";
import {ActionResult, Deck} from "@/app/lib/types";
import React, {Dispatch, SetStateAction} from "react";
import PhoneModal from "@/app/components/PhoneModal";
import CreateDeckFormElements from "@/app/components/CreateDeckFormElements";
import OnSuccess from "@/app/components/OnSuccess";
import CreateForm from "@/app/components/CreateForm";
import {createDeckAction} from "@/app/lib/form_actions";


interface DecksContextProps {
    decks: Deck[];
    setDecks: Dispatch<SetStateAction<Deck[]>>;
}

export const DecksContext = React.createContext<DecksContextProps>({ decks: [], setDecks: () => {} });


export default function DecksContent({ decks }: { decks: Deck[] }) {
    const [decksState, setDecksState] = React.useState(decks);
    const [current,setCurrent] = React.useState({
        isOpen: false,
        modalHtml: <></>
    });

    console.log(decksState)

    function updateDecksState(data: ActionResult ) {
        setCurrent(prev => {
            return ({ ...prev, decks: [(data.successValue as Deck[])[0], ...decksState]})
        })
    }

    // create a deck
    function createDeckModal() {
        setCurrent(prev => (
            { ...prev,
                isOpen: true,
                modalHtml:
                    <OnSuccess onSuccess={updateDecksState}>
                        <CreateForm action={createDeckAction}>
                            <CreateDeckFormElements />
                        </CreateForm>
                    </OnSuccess>
            }));
    }

    function closeModal(){
        setCurrent(prev => ({ ...prev, isOpen: false }));
    }

    return (
        <DecksContext.Provider value={{ decks: decksState, setDecks: setDecksState }}>
            {/* create new deck button */}
            <div className={`w-full z-4 my-8 mx-auto text-center flex justify-center items-center relative text-semibold
                      ${decksState.length === 0 ? 'h-screen ' : ''}`}>
                <button className={`${buttonClasses} ${decksState.length === 0 ? 'absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2' : ''}`} onClick={createDeckModal}>Create New Deck</button>
            </div>

            {/* deck slider */}
            {decksState.length > 0 && <DecksSlider decks={decksState}></DecksSlider>}

            <PhoneModal height={'h-[40%]'} isOpen={current.isOpen} closeModalState={closeModal as Dispatch<SetStateAction<boolean>>}>
                {current.modalHtml}
            </PhoneModal>
        </DecksContext.Provider>
    )
}


