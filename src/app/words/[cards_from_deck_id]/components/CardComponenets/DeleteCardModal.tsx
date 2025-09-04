import DeleteForm from "@/app/components/DeleteForm";
import SubmitButton from "@/app/components/SubmitButton";
import {buttonClasses} from "@/app/lib/reuse-classes";
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
    const deleteButtonStyle = "cursor-pointer text-xl font-medium bg-app_red-light text-white px-5 py-3 border-2 rounded-lg hover:bg-app_red-light border-app_orange hover:text-app_yellow flex justify-center items-center text-center"

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




