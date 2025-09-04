import UpdateFormModal from "@/app/components/UpdateFormModal";
import CardForm from "@/app/components/CardForm";
import {updateCardAction} from "@/app/lib/form_actions";
import SubmitButton from "@/app/components/SubmitButton";
import {buttonClasses} from "@/app/lib/reuse-classes";
import React from "react";

interface UpdateCardModalProps {
    id: string;
    changeModal?: () => void;
    word: string;
    meaning: string;
    description?: string;
}

export default function UpdateCardModal({ id, word, meaning, description, changeModal }: UpdateCardModalProps) {
    return <UpdateFormModal>
        <button className={`top-3.5 left-2 text-app_orange font-bold text-direct underline outline-none mb-2 ml-2`} onClick={changeModal}>{"<- Go Back"}</button>
        <CardForm word={word} meaning={meaning} description={description} action={(_, fromData) => updateCardAction(_, fromData, id)}>
            <SubmitButton className={`${buttonClasses} absolute bottom-5 left-1/2 transform -translate-x-1/2`} fallBackText={'Updating...'}>
                Update!
            </SubmitButton>
        </CardForm>
    </UpdateFormModal>
}

