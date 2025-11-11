'use client';

import PhoneModal from "@/app/components/PhoneModal";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import CardForm from "@/app/components/CardForm";
import {createNewCardAction} from "@/app/lib/form_actions";
import SubmitButton from "@/app/components/SubmitButton";
import {buttonClasses} from "@/app/lib/reuse-classes";
import {ActionResult, Card} from "@/app/lib/types";
import {CardSectionContext} from "@/app/words/[deck_id]/components/CardComponenets/CardSection";
import OnSuccess from "@/app/components/OnSuccess";
import Link from "next/link";


export default function CreateCardLayout({ deckId }: { deckId: string }) {
    const { cards,setCards } = useContext(CardSectionContext)

    const [current, setCurrent] = useState({
        isOpen: false,
    });

    function openModal() {
        setCurrent({ isOpen: true });
    }

    function closeModal(){
        setCurrent({ isOpen: false });
    }

    function onSuccessAction(data: ActionResult) {
        if(data.succeeded){
            const successValue = data.successValue as Card;
            setCards(prevState => [successValue, ...prevState]);
        }
    }

    return (
        <>
            { cards.length > 0 &&
                <Link href={`/start/` + (deckId) + "?source=words"} className={"absolute bottom-5 left-1/2 right-1/2 bg-app_orange w-[95%] -translate-x-1/2 text-center text-app_red-dark border-2 rounded-lg border-app_yellow py-2.5 font-bold text-3xl"}>Start!</Link>
            }
            <div className="w-screen flex justify-center text-center flex-col items-center
                          bg-transparent border-x-0 border-b-0 mt-5 font-semibold text-changer">
                <button onClick={openModal} className="w-[80%] border-app_yellow bg-transparent-orange py-2.5 px-1
                                rounded-lg border-2 text-3xl flex items-center justify-center
                                my-5 text-app_red-dark h-[60px] overflow-hidden relative bg-transperint-orange cursor-pointer">
                    {/* the spin animation lives here */}
                    <div className="roles-slider">
                        <span className="role">+</span>
                        <span className="role">Create A Card</span>
                        <span className="role">Add Words</span>
                        <span className="role">+</span>
                    </div>
                </button>
            </div>
            <PhoneModal isOpen={current.isOpen} closeModalState={closeModal as Dispatch<SetStateAction<boolean>>}>
                <OnSuccess onSuccess={onSuccessAction}>
                    <CardForm  action={(_, fromData) => createNewCardAction(_, fromData, deckId)}>
                        <SubmitButton className={`${buttonClasses} absolute bottom-5 left-1/2 transform -translate-x-1/2`} fallBackText={'Creating...'}>
                            Create!
                        </SubmitButton>
                    </CardForm>
                </OnSuccess>
            </PhoneModal>
        </>
    )
}



