"use client";
// ask the user to recall the meaning of the card
import {Card} from "@/app/lib/types";
import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";
import useInputChange from "@/app/hooks/useInputChange";
import NextTestButton from "@/app/components/NextTestButton";
import {inputClasses} from "@/app/lib/reuse-classes";
import {useContext, useState} from "react";
import {TestResultContext} from "@/app/start/[deck_id]/components/StartHolder";



export default function TypingTest({ card }: { card: Card }) {
    const { addResult } = useContext(TestResultContext);
    const testOn = card.mark <= 10 ? "meaning" : "word"
    const [currentValue, update] = useInputChange({
        input: "",
    })
    const [currentTestState, setCurrentTestState] = useState({
        isChecked: false,
    })

    function isRightAnswer(): boolean {
       const testOn = card.mark <= 10 ? "word" : "meaning"
       return currentValue.input.trim().toLowerCase() === card[testOn].trim().toLowerCase()
    }

    function handleCheck(): string{
        if(!currentTestState.isChecked) {
            return "";
        }

        if(isRightAnswer()){
            return "bg-green-500 text-white border-green-700";
        }else {
            return "bg-red-500 text-white";
        }
    }

    return (
        <div className={"my-5"}>
            <div className={"flex justify-center items-center flex-col h-screen"}>
                <div className={"my-10 text-app_orange"}>
                    <p className={"text-2xl"}>What is the meaning of?</p>
                    <h1 className={"text-3xl text-center"}>&#34;{card[testOn]}&#34;</h1>
                </div>
                <input type="text" name="input" onChange={update} value={currentValue.input} disabled={currentTestState.isChecked} className={inputClasses + `bg-app_yellow w-[95%] h-[50px] ${handleCheck()}`} placeholder={"Means..."} />
                <NextTestButton disabled={!(currentValue && !currentTestState.isChecked)} className={`${currentValue.input && !currentTestState.isChecked ? "opacity-100" : "opacity-0"} right-1/2 translate-x-1/2 transition-all`} action={() => {
                        setCurrentTestState({...currentTestState, isChecked: true})
                }} removeDefaultAction={true}>Check</NextTestButton>
                {currentTestState.isChecked &&
                    <NextTestButton disabled={!(currentValue.input && currentTestState.isChecked)} className={`${currentValue.input && currentTestState.isChecked? "opacity-100" : "opacity-0"} right-1/2 translate-x-1/2 transition-all`} action={() => {
                        addResult({card_id: card.card_id, passed: isRightAnswer()})
                    }}>Next</NextTestButton>}
            </div>
        </div>
    )
}
