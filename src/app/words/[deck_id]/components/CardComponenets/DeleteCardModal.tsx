import DeleteForm from "@/app/components/DeleteForm";
import SubmitButton from "@/app/components/SubmitButton";
import {buttonClasses, deleteButtonStyle} from "@/app/lib/reuse-classes";
import {deleteCardFromAction} from "@/app/lib/form_actions";
import {ActionResult} from "@/app/lib/types";

interface DeleteCardModalProps {
    id: string;
    description?: string;
    word: string;
    meaning: string;
    onDelete: (data: ActionResult) => void;
    changeModal: () => void;
}

export default function DeleteCardModal({ onDelete, id, description, word, meaning, changeModal }: DeleteCardModalProps){
    return (
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
                <button className={buttonClasses} onClick={changeModal}>
                    Edit
                </button>
            </div>
        </DeleteForm>
    )
}




