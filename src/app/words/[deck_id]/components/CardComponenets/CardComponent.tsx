'use client';
import React, {useContext, useEffect} from "react";
import PhoneModal from "@/app/components/PhoneModal";
import DeleteForm from "@/app/components/DeleteForm";
import {deleteCardFromAction, updateCardAction} from "@/app/lib/form_actions";
import {ActionResult, Card} from "@/app/lib/types";
import {CardSectionContext} from "@/app/words/[deck_id]/components/CardComponenets/CardSection";
import SubmitButton from "@/app/components/SubmitButton";
import UpdateFormModal from "@/app/components/UpdateFormModal";
import {buttonClasses} from "@/app/lib/reuse-classes";
import CardForm from "@/app/components/CardForm";
import UpdateCardModal from "@/app/words/[deck_id]/components/CardComponenets/UpdateCardModal";
import DeleteCardModal from "@/app/words/[deck_id]/components/CardComponenets/DeleteCardModal";
import OnSuccess from "@/app/components/OnSuccess";

interface CardComponentProps {
    id: string;
    description?: string;
    children: [React.ReactElement<{ children: string }>, React.ReactElement<{ children: string }>];
    cardsContext: { cards: Card[], setCards: React.Dispatch<React.SetStateAction<Card[]>> };
}

export default function CardComponent({ id, description, children, cardsContext }: CardComponentProps ){
    const { setCards, cards } = cardsContext;
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState({ modal: false, modalContent: <></> });
    const [showInfoButton, setShowInfoButton] = React.useState(true);
    const word = children[0].props.children as string;
    const meaning = children[1].props.children as string;

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setShowInfoButton(true);
        }, 350);

        return () => clearTimeout(timeOut);
    }, [isFlipped]);

    function onDelete(data: ActionResult){
        if(data.succeeded){
            setIsOpen({ modal: false, modalContent: <></> });
            setCards(cards.filter((card) => card.card_id !== id));
        }
    }

    function onUpdateSuccess(data: ActionResult){
        const successValue = data.successValue as Card[];

        if(data.succeeded){
            setIsOpen({ modal: false, modalContent: <></> });
            setCards(perv => perv.map((card) => {
                if(card.card_id === (successValue![0] as Card).card_id){
                    return {
                        ...card,
                        word: (successValue![0] as Card).word,
                        meaning: (successValue![0] as Card).meaning,
                        description: (successValue![0] as Card).description
                    }
                }else {
                    return card;
                }
            }));
        }
    }

    function changeToDeleteModal(){
        setIsOpen({ modal: true, modalContent:
            <DeleteCardModal
                onDelete={onDelete}
                id={id}
                meaning={meaning}
                word={word}
                description={description}
                changeModal={changeToUpdateModal}>
            </DeleteCardModal>
        });
    }

    function changeToUpdateModal(){
        setIsOpen({ modal: true, modalContent:
            <OnSuccess onSuccess={onUpdateSuccess}>
                <UpdateCardModal
                    word={word}
                    meaning={meaning}
                    description={description}
                    id={id}
                    changeModal={changeToDeleteModal}
                />
            </OnSuccess>
            });
    }


    return (
        <div className={`w-screen flex items-center justify-center my-2.5`}>
            {/* the main container for the card*/}
            <div className={'w-[70%] min-h-[80px] bg-none relative'}>
                {/*the card itself*/}
                <div onClick={() => {
                    setIsFlipped(!isFlipped)
                    setShowInfoButton(false);
                }} className={`relative w-full h-full min-h-[80px] rounded-md
                                transition-all duration-500 border-app_red-dark border-2 px-2 py-1 
                                [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    {children}
                </div>


                {/* if description exists */}
                { showInfoButton &&
                    <button onClick={changeToDeleteModal} className={`absolute top-1 left-1 border-2 
                    border-app_red-light rounded-full w-[25px] h-[25px] flex items-center justify-center text-xl text-app_yellow bg-transparent-orange
                    `}>
                        i
                    </button>
                }

                { showInfoButton &&
                    <PhoneModal isOpen={isOpen.modal} closeModalState={() => setIsOpen({ modal: false, modalContent: <></> })}>
                        {isOpen.modalContent}
                    </PhoneModal>
                }
            </div>
        </div>
    )
}

