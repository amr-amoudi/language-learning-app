'use client';

import DecksSlider from "@/app/words/components/DecksSlider";
import {buttonClasses} from "@/app/lib/reuse-classes";
import {ActionResult, Deck} from "@/app/lib/types";
import React, {Dispatch, ReactNode, SetStateAction} from "react";
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


export default function DecksContent({ decks, children }: { decks: Deck[], children: ReactNode }) {
    const [decksState, setDecksState] = React.useState(decks);
    const [current,setCurrent] = React.useState({
        isOpen: false,
        modalHtml: <></>
    });


    function updateDecksState(data: ActionResult) {
        // the newly added deck first so it changes to it without changing the index
        // in <DecksSlider></DecksSlider>
        setDecksState(prev => [(data.successValue as Deck[])[0], ...prev])
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

            {decksState.length > 0 && <div className={'w-screen border-app_yellow border-1 my-5'}></div>}

            {/* the rest of the page */}
            {/* the create button, the cards */}
            {/* passed as children to be reactive with the decks state */}
            { decksState.length > 0 && children }


            <PhoneModal height={'h-[40%]'} isOpen={current.isOpen} closeModalState={closeModal as Dispatch<SetStateAction<boolean>>}>
                {current.modalHtml}
            </PhoneModal>
        </DecksContext.Provider>
    )
}


