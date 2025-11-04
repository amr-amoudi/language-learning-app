"use client"
import {Card, Result} from "@/app/lib/types";
import WordIntroduction from "@/app/start/[deck_id]/components/WordIntroduction";
import TypingTest from "@/app/start/[deck_id]/components/TypingTest";
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

interface TestResultContextTypes {
    testResult: Result[],
    setTestResult: Dispatch<SetStateAction<Result[]>>,
    addResult: (result: Result) => void,
}



export const TestResultContext = createContext<TestResultContextTypes>(
    {
        testResult: [],
        setTestResult: () => {
        },
        addResult: (result: Result) => {
        }
    })

export default function StartHolder({ cards }: StartHolderProps){
    const [testResult, setTestResult] = useState<Result[]>([]);

    useEffect(() => {
        console.log(testResult);
    }, [testResult]);

    function addResult(result: Result) {
        setTestResult(prev => [...prev, result]);
    }

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
        }else if(card.mark >= 10){
            return <TypingTest key={card.card_id} card={card}></TypingTest>
        } else {
            <h1 key={card.card_id}>{ card.mark }</h1>
        }
    })




    return (
        <div className={'mt-14 h-screen w-screen'}>
            <TestResultContext.Provider value={{ testResult, setTestResult, addResult }}>
                <FormSwitcher>
                    {[
                        ...testForACard,
                        <SessionCompleted results={testResult} key={"session"}></SessionCompleted>
                    ]}
                </FormSwitcher>
            </TestResultContext.Provider>
        </div>
    )
}
