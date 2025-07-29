'use client'

import { ReactNode, useActionState } from "react";
import { buttonClasses } from "../lib/reuse-classes";
import ErrorBanner from "./ErrorBanner";
import returnErrorMessages from "../util/return-error-messages";

interface FormForModalsProps {
  children: ReactNode;
  action: (prev: any, FormData: FormData) => Promise<any>;
  buttonText: string;
  isOpen: boolean;
}

export default function FormForModals({ children, action, buttonText, isOpen }: FormForModalsProps) {
  const [state, formAction, isPending] = useActionState(action, { errors: {} });

  return (
    <form action={formAction}>

      {state?.message && state?.errors && isOpen && returnErrorMessages(state).map((message: string) => <ErrorBanner key={message + Date.now()}>{message}</ErrorBanner>)}

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

