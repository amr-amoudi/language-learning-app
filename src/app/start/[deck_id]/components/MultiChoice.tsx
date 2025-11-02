// src/app/start/[deck_id]/components/MultiChoice.tsx
"use client";
import { CardsData } from "@/app/start/[deck_id]/components/CardsDataHolder";
import { useContext, useState } from "react";
import { Card } from "@/app/lib/types";
import Choice from "@/app/start/[deck_id]/components/helperComponents/Choice";
import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";

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
    const [currentChoice, setCurrentChoice] = useState<number>(0);
    const [shuffledChoices] = useState(() => shuffleArray<Card>(cards, rightChoice, 4));

    return (
        <>
            <h1 className={"text-3xl text-app_yellow text-center"}>what is the meaning of:</h1>
            <p className={"text-3xl text-app_yellow text-center"} key={rightChoice.meaning + rightChoice.user_id}>
                {rightChoice.meaning}
            </p>

            <div className={"grid grid-cols-4 gap-3 w-full px-4"}>
                {shuffledChoices.map((choice, index) => (
                    <Choice
                        key={choice.card_id}
                        className={"w-full"}
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

            <NextPreviousFormButtons />
        </>
    );
}
