'use client'

import useInputChange from "../hooks/useInputChange"
import {buttonClasses, inputClasses, labelClasses} from "../lib/reuse-classes"
import useDisplayError from "../hooks/useDisplayError"
import React from "react";
import {ActionResult, Card} from "@/app/lib/types";
import {CardSectionContext} from "@/app/words/[deck_id]/components/CardComponenets/CardSection";
import CreateForm from "@/app/components/CreateForm";
import SubmitButton from "@/app/components/SubmitButton";

interface CardFormProps {
    action: (prev: unknown, FormData: FormData) => Promise<ActionResult>;
    children: React.ReactNode
    word?: string,
    meaning?: string,
    description?: string
}


export default function CardForm({ action, children, word, meaning, description }: CardFormProps) {
    const [errorElement, setErrorMessage] = useDisplayError([''], 2000)

    const [inputValues, handleUpdate] = useInputChange({
        word: word || '',
        meaning: meaning || '',
        description: description || ''
    }, (e) => {
        const { name, value } = e.target

        if (name === 'word' && value[value.length - 1] === ' ') {
            setErrorMessage(["spaces are not allowed in 'Word' "])
            return false
        }

        if (name === 'meaning' && value[value.length - 1] === ' ') {
            setErrorMessage(["spaces are not allowed in 'Meaning' "])
            return false
        }

        return true;
    })

    return (
        <CreateForm action={action}>

            {...errorElement}

            <div className="flex flex-col justify-cetner items-center">
                {/* Word input */}
                <label className={labelClasses} htmlFor="word">Word*</label>
                <input id='word' onChange={handleUpdate} value={inputValues.word} name='word' placeholder={'eg. "Здравствуйте"'} className={inputClasses} />

                {/* splitting line */}
                <div className="h-[2px] w-[95%] border-b-2 border-b-app_red-dark my-5 "></div>

                {/* Meaning input */}
                <label className={labelClasses} htmlFor="meaning">Meaning*</label>
                <input id='meaning' onChange={handleUpdate} value={inputValues.meaning} name="meaning" placeholder={'eg. "hello"'} className={inputClasses} />

                {/* Description */}
                <label className={labelClasses} htmlFor="description">Description</label>
                <textarea id='description' onChange={handleUpdate} value={inputValues.description} name="description" placeholder={'describe your word or add any other ways to explain it eg. "formal way of saying hello"'} className={inputClasses + 'placeholder:text-sm w-[95%] p-0 resize-none'}></textarea>

            </div>

            {children}
        </CreateForm>
    )
}