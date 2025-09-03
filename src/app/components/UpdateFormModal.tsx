import CardForm from "@/app/components/CardForm";
import SubmitButton from "@/app/components/SubmitButton";
import {buttonClasses} from "@/app/lib/reuse-classes";
import React from "react";

interface CreateCardAction {
    children: React.ReactNode;
}


export default function UpdateFormModal({ children }: CreateCardAction) {
    return (
        <>
            {children}
        </>
    )
}