"use client";
import {useContext} from "react";
import {FormSwitcherContext} from "@/app/components/FormSwitcher";

/**
 * coud be removed in production
* */


export default function NextPreviousFormButtons(){
    const { nextForm, previousForm, setActiveForm } = useContext(FormSwitcherContext);

    return (
        <>
            <button onClick={nextForm} className={"mt-2 bg-green-500 text-white px-4 py-2 rounded-md"}>Got it!</button>
            <button onClick={previousForm}>Go Back</button>
            <button onClick={() => setActiveForm(0)}>reset</button>
        </>
    )
}

