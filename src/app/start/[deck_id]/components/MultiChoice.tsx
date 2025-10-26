"use client";
import {CardsData} from "@/app/start/[deck_id]/components/CardsDataHolder";
import {useContext, useState} from "react";
import {Card} from "@/app/lib/types";
import Choice from "@/app/start/[deck_id]/components/helperComponents/Choice";
import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";
import {nanoid} from "nanoid";

function shuffleArray<T>(array: T[], item: T, maxItems: number): T[] {

    // remove Item from the array
    const temp = array.filter(i => JSON.stringify(i) !== JSON.stringify(item));

    // randomly shuffle the array
    for(let i = temp.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    // add the time back and take only maxItems
    const randomArray: T[] = temp.slice(0, maxItems - 1);
    randomArray.push(item);

    // shuffle again to mix the right answer
    for(let i = temp.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    return randomArray;
}

export default function MultiChoice({ rightChoice }: { rightChoice: Card }) {
    // take cards data from context
    const { cards } = useContext(CardsData)
    // track the choice by its index
    const [currentChoice, setCurrentChoice] = useState<number>(0)
    const [shuffledChoices, _] = useState(shuffleArray<Card>(cards, rightChoice, 4))

    return (
         <>
             <h1 key={rightChoice.meaning + rightChoice.user_id}> what is the meaning of: { rightChoice.meaning } </h1>
             {
                    shuffledChoices.map((choice, index) => {
                        return (
                            <Choice key={nanoid()} isActive={index === currentChoice} onClick={() => { setCurrentChoice(index);
                                console.log(choice)}} >{choice.word}</Choice>
                        )
                    })
             }
             <NextPreviousFormButtons></NextPreviousFormButtons>
         </>
    )
}



