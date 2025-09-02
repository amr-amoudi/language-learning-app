import {buttonClasses} from "@/app/lib/reuse-classes";
import {JSX, ReactNode, useActionState, useEffect, useRef} from "react";
import useDisplayError from "@/app/hooks/useDisplayError";
import type {ActionResult} from "@/app/lib/types";


interface DeleteButtonProps {
    children: ReactNode;
    onSuccess?: (Data: ActionResult) => void;
    action: (prev: unknown, formData: FormData) => Promise<ActionResult>;
}

export default function DeleteFormModal({ children, onSuccess, action }: DeleteButtonProps) {
    const deleteButtonStyle = "cursor-pointer text-xl font-medium bg-app_red-light text-white px-5 py-3 border-2 rounded-lg hover:bg-app_red-light border-app_orange hover:text-app_yellow flex justify-center items-center text-center"
    const [errorElements, setErrorMessages] = useDisplayError([''], 2000)

    const initialState: ActionResult = {
        succeeded: false,
        errors: [],
        successValue: undefined,
    };
    const [state, formAction, pending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.succeeded) {
            if (onSuccess) {
                onSuccess(state);
            }
        }

        if (!state.succeeded && state.errors && state.errors[0]) {
            setErrorMessages(state.errors)
        }
    }, [state]);


    return (
        <form action={formAction} className={"px-5 py-2 h-full"}>
            {...errorElements}
            <div className={""}>
                { children }
            </div>
            <div className={`flex justify-center items-center gap-3.5 ${children ? "absolute" : ""} bottom-5 left-[50%] right-[50%]`}>
                <button
                    type={"submit"}
                    disabled={pending}
                    className={`${deleteButtonStyle} ${pending ? 'cursor-not-allowed' : ''}`}>
                    {pending ? "Deleting..." : "Delete"}
                </button>
            </div>
        </form>
    )
}



