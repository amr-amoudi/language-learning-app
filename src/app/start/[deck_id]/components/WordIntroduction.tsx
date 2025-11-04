"use client";
import {Card} from "@/app/lib/types";
import Hr from "@/app/components/Hr";
import BlurredText from "@/app/start/[deck_id]/components/helperComponents/BlurredText";
import {useContext, useState} from "react";
import {TestResultContext} from "@/app/start/[deck_id]/components/StartHolder";
import NextTestButton from "@/app/components/NextTestButton";

export default function WordIntroduction({card}: { card: Card}) {
    const [wordToggleState, setWordToggleState] = useState<boolean>(false);
    const { addResult } = useContext(TestResultContext)

    return (
        <div className={"my-5 flex flex-col items-center justify-center overflow-hidden"}>
            <h1 className={'text-center text-5xl text-app_orange my-20'}>{card.word}</h1>
            <BlurredText isShown={wordToggleState} onClick={()=>setWordToggleState(true)}>
                <p className={"text-app_yellow text-3xl py-5"}>{card.meaning}</p>
            </BlurredText>
            {card.description && <Hr className={`max-w-[95%] m-auto transition-all ${wordToggleState ? "opacity-100" : "opacity-0"}`}/>}
            {card.description && <p className={`text-app_orange text-2xl transition-all ${wordToggleState ? "opacity-100" : "opacity-0"}`}>{card.description}</p>}
            {wordToggleState && <NextTestButton className={"left-1/2 -translate-x-1/2"} action={() => addResult({card_id: card.card_id, passed: true})}>
                Got it!
            </NextTestButton>}
        </div>
    )
}

