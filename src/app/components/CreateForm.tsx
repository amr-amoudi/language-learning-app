'use client'

import { ReactNode, useActionState, useContext, useEffect } from "react";
import type { ActionResult } from "../lib/types";
import { ModalContext } from "./PhoneModal";
import useDisplayError from "../hooks/useDisplayError";
import {OnSuccessContext} from "@/app/components/OnSuccess";


interface AddFromModalsProps {
    children: ReactNode;
    action: (prev: unknown, FormData: FormData) => Promise<ActionResult>;
    onSuccessFunction?: { onSuccess: (data: ActionResult) => void };
}

export default function CreateForm({ children, action, onSuccessFunction }: AddFromModalsProps) {
    const { onSuccess } = useContext(OnSuccessContext)
    const { isOpen, setIsOpen } = useContext(ModalContext)
    const [errorElements, setErrorMessages] = useDisplayError([''], 2000)

    const initialState: ActionResult = {
        succeeded: false,
        errors: [],
        successValue: undefined,
    };
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state.succeeded && isOpen) {
            setIsOpen(false)
            // use the passed onSuccess function if it exists, otherwise use the context one
            // so old code that uses this component without using <OnSuccess> component still works
            if (onSuccessFunction?.onSuccess) {
                onSuccessFunction.onSuccess(state);
            }else {
                onSuccess(state)
            }
        }

        // if the action failed
        if (!state.succeeded && state.errors && state.errors[0]) {
            setErrorMessages(state.errors)
        }
    }, [state]);

    return (
        <form className="pb-[10%] relitive" action={formAction}>

            {...errorElements}

            {children}
        </form>
    );
}