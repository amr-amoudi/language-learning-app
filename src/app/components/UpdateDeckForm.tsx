import CreateForm from "@/app/components/CreateForm";
import {updateDeckFormAction} from "@/app/lib/form_actions";
import CreateDeckFormElements from "@/app/components/CreateDeckFormElements";
import {ReactNode} from "react";


export default function UpdateDeckForm({ children, deckId, name }: { children: ReactNode, deckId: string, name: string}) {
    return (
        <CreateForm action={(_, formData: FormData) => updateDeckFormAction(_, formData, deckId)}>
            <CreateDeckFormElements name={name}>
                { children }
            </CreateDeckFormElements>
        </CreateForm>
    )
}




