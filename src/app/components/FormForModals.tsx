'use client'

import { ReactNode, useActionState, useContext, useEffect } from "react";
import { buttonClasses } from "../lib/reuse-classes";
import type { ActionResult } from "../lib/types";
import { ModalContext } from "./PhoneModal";
import useDisplayError from "../hooks/useDisplayError";


interface FormForModalsProps {
  children: ReactNode;
  action: (prev: unknown, FormData: FormData) => Promise<ActionResult>;
  buttonText: string;
  onSuccess?: (data: ActionResult) => void;
  disableButton?: boolean
}

export default function FormForModals({ children, action, buttonText, onSuccess, disableButton }: FormForModalsProps) {
  const { setIsOpen } = useContext(ModalContext)
  const [errorElements, setErrorMessages] = useDisplayError([''], 2000)

  const initialState: ActionResult = {
    succeeded: false,
    errors: [],
    successValue: undefined,
  };
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.succeeded) {
      setIsOpen(false)
      if (onSuccess) {
        onSuccess(state);
      }
    }

    if (!state.succeeded && state.errors && state.errors[0]) {
      setErrorMessages(state.errors)
    }
  }, [state, onSuccess]);

  return (
    <form className="pb-[10%]" action={formAction}>

      {...errorElements}

      {children}

      <button
        type="submit"
        disabled={isPending || disableButton}
        className={`${buttonClasses} ${isPending ? 'cursor-not-allowed' : ''} m-auto mt-5`}
      >
        {buttonText}
      </button>
    </form>
  );
}

