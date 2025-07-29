'use client'

import { ReactNode, useActionState } from "react";
import { buttonClasses } from "../lib/reuse-classes";
import ErrorBanner from "./ErrorBanner";
import returnErrorMessages from "../util/return-error-messages";
import type { ActionResult } from "../lib/types";

interface FormForModalsProps {
  children: ReactNode;
  action: (prev: unknown, FormData: FormData) => Promise<ActionResult>;
  buttonText: string;
  isOpen: boolean;
}

export default function FormForModals({ children, action, buttonText, isOpen }: FormForModalsProps) {
  const initialState: ActionResult = {
    message: '',
    errors: {},
    successValue: undefined,
  };
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction}>

      {state?.message && state?.errors && isOpen && returnErrorMessages({ errors: state.errors }).map((message: string) => <ErrorBanner key={message + Date.now()}>{message}</ErrorBanner>)}

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

