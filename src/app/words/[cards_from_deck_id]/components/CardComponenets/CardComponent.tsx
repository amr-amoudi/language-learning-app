'use client';
import React, {useEffect} from "react";
import PhoneModal from "@/app/components/PhoneModal";
import DeleteForm from "@/app/components/DeleteForm";
import {deleteCardFromAction, updateCardAction} from "@/app/lib/form_actions";
import {ActionResult} from "@/app/lib/types";
import {CardSectionContext} from "@/app/words/[cards_from_deck_id]/components/CardComponenets/CardSection";
import SubmitButton from "@/app/components/SubmitButton";
import UpdateFormModal from "@/app/components/UpdateFormModal";
import {buttonClasses} from "@/app/lib/reuse-classes";
import CardForm from "@/app/components/CardForm";
import UpdateCardModal from "@/app/words/[cards_from_deck_id]/components/CardComponenets/UpdateCardModal";

interface CardComponentProps {
    id: string;
    description?: string;
    children: [React.ReactElement<{ children: string }>, React.ReactElement<{ children: string }>];
}


export default function CardComponent({ id, description, children }: CardComponentProps ){
    const { setCards, cards } = React.useContext(CardSectionContext);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState({ modal: false, modalContent: <></> });
    const [showInfoButton, setShowInfoButton] = React.useState(true);
    const deleteButtonStyle = "cursor-pointer text-xl font-medium bg-app_red-light text-white px-5 py-3 border-2 rounded-lg hover:bg-app_red-light border-app_orange hover:text-app_yellow flex justify-center items-center text-center"
    const word = children[0].props.children as string;
    const meaning = children[1].props.children as string;

    function changeModal(modal: React.ReactElement){
        setIsOpen({ modal: true, modalContent: modal });
    }

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
        console.log(data)
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
                    <button onClick={() => setIsOpen(
                        { modal: true, modalContent:
                        <DeleteForm onSuccess={onDelete} action={(_, formData: FormData) => deleteCardFromAction(_, formData, id)}>
                            {description && <h1 datatype={'editable'} className={"text-2xl"}>Description: {description}</h1>}
                            {description && <hr className={'my-5'}/>}
                            <h1 className={"text-2xl"}>Word: {word}</h1>
                            <h1 className={"text-2xl"}>Meaning: {meaning}</h1>
                            <div className={`flex items-center justify-center absolute bottom-5 left-[50%] right-[50%]`}>
                                <SubmitButton
                                    type={"submit"}
                                    className={`${deleteButtonStyle} `}
                                    fallBackText={"Deleting..."}
                                >
                                    Delete
                                </SubmitButton>
                                <button className={buttonClasses} onClick={() => changeModal(<UpdateCardModal
                                    word={word}
                                    meaning={meaning}
                                    id={id}
                                    changeModal={() => changeModal}
                                    onSuccessAction={onUpdateSuccess}
                                />)}>
                                    Edit
                                </button>
                            </div>
                        </DeleteForm>
                        })} className={`absolute top-1 left-1 border-2 
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


