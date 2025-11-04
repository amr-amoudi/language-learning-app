// src/app/start/[deck_id]/components/MultiChoice.tsx
"use client";
import { CardsData } from "@/app/start/[deck_id]/components/CardsDataHolder";
import { useContext, useState } from "react";
import { Card } from "@/app/lib/types";
import Choice from "@/app/start/[deck_id]/components/helperComponents/Choice";
import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";
import NextTestButton from "@/app/components/NextTestButton";
import {TestResultContext} from "@/app/start/[deck_id]/components/StartHolder";
import BlurredText from "@/app/start/[deck_id]/components/helperComponents/BlurredText";

function shuffleArray<T>(array: T[], item: T, maxItems: number): T[] {
    // remove item from the array
    const temp = array.filter(i => JSON.stringify(i) !== JSON.stringify(item));

    // randomly shuffle temp
    for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    // take up to maxItems - 1 from temp, then add the right item
    const randomArray: T[] = temp.slice(0, Math.max(0, maxItems - 1));
    randomArray.push(item);

    // shuffle the final array (must shuffle randomArray)
    for (let i = randomArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }

    return randomArray;
}

export default function MultiChoice({ rightChoice }: { rightChoice: Card }) {
    const { cards } = useContext(CardsData);
    const { addResult } = useContext(TestResultContext);
    const [currentChoice, setCurrentChoice] = useState<number | null>(null);
    const [shuffledChoices] = useState(() => shuffleArray<Card>(cards, rightChoice, 4));
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    function getChoiceColorWhenSubmitted(index: number): string {
        if(!isSubmitted) {
            return "";
        }
        // if the current chosen word === right word then green
        if(shuffledChoices[index].word === rightChoice.word) {
            return "bg-green-500 text-white";
            // if the current chosen word !== right word then red
        } else if(shuffledChoices[index].word !== rightChoice.word && index === currentChoice) {
            return "bg-red-500 text-white";
        }
        // if the word isn't chosen leave it
        return "";
    }

    return (
        <>
            <h1 className={"text-3xl text-app_yellow text-center"}>what is the meaning of</h1>
            <p className={"text-3xl text-app_yellow text-center"} key={rightChoice.meaning + rightChoice.user_id}>
                {rightChoice.meaning}
            </p>

            <BlurredText isShown={isSubmitted} className={"absolute text-app_yellow text-center bottom-1/2 left-1/2 -translate-x-1/2 text-2xl"}>
                {rightChoice.description}
            </BlurredText>

            <div className={"grid grid-cols-2 gap-2 max-w-[700px] w-[95%] left-1/2 right-1/2 -translate-x-1/2 bottom-1/7 absolute"}>
            {shuffledChoices.map((choice, index) => (
                    <Choice
                        key={choice.card_id}
                        className={`w-full py-3 transition-all ${
                           getChoiceColorWhenSubmitted(index) 
                        }
                                `}
                        isActive={index === currentChoice}
                        onClick={() => {
                            setCurrentChoice(index);
                            console.log(choice);
                        }}
                    >
                        {choice.word}
                    </Choice>
                ))}
            </div>

            {
                !isSubmitted && currentChoice !== null
                &&
                <NextTestButton removeDefaultAction={true} className={"left-1/2 right-1/2 -translate-x-1/2 transition-all"} action={() => {
                    setIsSubmitted(true);
                }}>
                    Submit
                </NextTestButton>
            }

            {
                isSubmitted && (currentChoice !== null)
                &&
                <NextTestButton className={"left-1/2 right-1/2 -translate-x-1/2 transition-all"} action={() => {
                    addResult({passed: rightChoice === shuffledChoices[currentChoice!], card_id: rightChoice.card_id});
                }}>
                    Next
                </NextTestButton>
            }
        </>
    );
}

