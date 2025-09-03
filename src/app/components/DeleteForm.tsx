import {buttonClasses} from "@/app/lib/reuse-classes";
import {JSX, ReactNode, useActionState, useEffect, useRef} from "react";
import useDisplayError from "@/app/hooks/useDisplayError";
import type {ActionResult} from "@/app/lib/types";


interface DeleteButtonProps {
    children: ReactNode;
    onSuccess?: (Data: ActionResult) => void;
    action: (prev: unknown, formData: FormData) => Promise<ActionResult>;
}

export default function DeleteForm({ children, onSuccess, action }: DeleteButtonProps) {
    const [errorElements, setErrorMessages] = useDisplayError([''], 2000)

    const initialState: ActionResult = {
        succeeded: false,
        errors: [],
        successValue: undefined,
    };
    const [state, formAction] = useActionState(action, initialState);

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
        <form action={formAction} className={"px-5 py-2 h-full w-full m-auto"}>
            {...errorElements}
            { children }
        </form>
    )
}



