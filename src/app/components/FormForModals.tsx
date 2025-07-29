'use client'

import { ReactNode, useActionState, useContext, useEffect } from "react";
import { buttonClasses } from "../lib/reuse-classes";
import ErrorBanner from "./ErrorBanner";
import returnErrorMessages from "../util/return-error-messages";
import type { ActionResult } from "../lib/types";
import { ModalContext } from "./PhoneModal";


interface FormForModalsProps {
  children: ReactNode;
  action: (prev: unknown, FormData: FormData) => Promise<ActionResult>;
  buttonText: string;
  onSuccess?: (data: ActionResult) => void;
}

export default function FormForModals({ children, action, buttonText, onSuccess }: FormForModalsProps) {
  const { isOpen, setIsOpen } = useContext(ModalContext)

  const initialState: ActionResult = {
    succeeded: false,
    errors: {},
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
  }, [state])

  return (
    <form className="pb-[10%]" action={formAction}>

      {!state?.succeeded &&
        state?.errors &&
        isOpen &&
        returnErrorMessages({ errors: state.errors }).map((message: string) => <ErrorBanner key={message + Date.now()}>{message}</ErrorBanner>)}

      {children}

      <button
        type="submit"
        disabled={isPending}
        className={`${buttonClasses} ${isPending ? 'cursor-not-allowed' : ''} m-auto mt-5`}
      >
        {buttonText}
      </button>
    </form>
  );
}

