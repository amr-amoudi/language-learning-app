"use client";
import {Card} from "@/app/lib/types";
import Hr from "@/app/components/Hr";
import ToggleableText from "@/app/start/[deck_id]/components/helperComponents/ToggleableText";
import {useContext, useState} from "react";
import {TestResultContext} from "@/app/start/[deck_id]/components/StartHolder";
import {FormSwitcherContext} from "@/app/components/FormSwitcher";

export default function WordIntroduction({card}: { card: Card}) {
    const [wordToggleState, setWordToggleState] = useState<boolean>(false);
    const { setTestResult } = useContext(TestResultContext)
    const { nextForm } = useContext(FormSwitcherContext);

    return (
        <div className={"my-5 flex flex-col items-center justify-center overflow-hidden"}>
            <h1 className={'text-center text-5xl text-app_orange my-20'}>{card.word}</h1>
            <ToggleableText CopyToggleState={setWordToggleState}>
                <p className={"text-app_yellow text-3xl py-5"}>{card.meaning}</p>
            </ToggleableText>
            {card.description && <Hr className={`max-w-[95%] m-auto transition-all ${wordToggleState ? "opacity-100" : "opacity-0"}`}/>}
            {card.description && <p className={`text-app_orange text-2xl transition-all ${wordToggleState ? "opacity-100" : "opacity-0"}`}>{card.description}</p>}
            {wordToggleState && <button className={'absolute bottom-5 bg-app_orange w-[95%] h-fit py-3 text-app_red-dark border-app_yellow border rounded-lg font-bold text-3xl'} onClick={() => {
                setTestResult(prev => [...prev, true]);
                nextForm();
            }}>Next</button>}
        </div>
    )
}

