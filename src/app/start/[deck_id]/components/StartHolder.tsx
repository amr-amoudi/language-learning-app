"use client"
import {Card} from "@/app/lib/types";
import WordIntroduction from "@/app/start/[deck_id]/components/WordIntroduction";
import CardMeaningTest from "@/app/start/[deck_id]/components/CardMeaningTest";
import CardWordTest from "@/app/start/[deck_id]/components/CardWordTest";
import MultiChoice from "@/app/start/[deck_id]/components/MultiChoice";
import CardsDataHolder from "@/app/start/[deck_id]/components/CardsDataHolder";
import FormSwitcher from "@/app/components/FormSwitcher";
import {nanoid} from "nanoid";
import SessionCompleted from "@/app/start/[deck_id]/components/SessionCompleted";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";

interface StartHolderProps {
    cards: Card[]
}

export const TestResultContext = createContext<{ testResult: boolean[], setTestResult: Dispatch<SetStateAction<boolean[]>> }>({ testResult: [], setTestResult: () => {} })

export default function StartHolder({ cards }: StartHolderProps){
    const [testResult, setTestResult] = useState<boolean[]>([]);

    useEffect(() => {
        console.log(testResult);
    }, [testResult]);

    // each card has its own test passed on its mark
    const testForACard = cards.map(card =>  {
        if(card.mark === 0){
            return <WordIntroduction key={card.card_id} card={card} />
        }else if(card.mark === 5){
            return (
                <CardsDataHolder cards={cards} key={nanoid()}>
                    <MultiChoice rightChoice={card} key={nanoid()}></MultiChoice>
                </CardsDataHolder>
            )
        }else if(card.mark === 10){
            return <CardMeaningTest key={card.card_id} card={card}></CardMeaningTest>
        }else if(card.mark === 15){
            return(
                <CardWordTest key={card.card_id} card={card}></CardWordTest>
            )
        } else {
            <h1 key={card.card_id}>{ card.mark }</h1>
        }
    })




    return (
        <div className={'mt-14 h-screen w-screen'}>
            <TestResultContext.Provider value={{ testResult, setTestResult }}>
                <FormSwitcher>
                    {[
                        ...testForACard,
                        <SessionCompleted key={"session"}></SessionCompleted>
                    ]}
                </FormSwitcher>
            </TestResultContext.Provider>
        </div>
    )
}
