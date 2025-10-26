import {getCardsForCurrentDeck, getCardsForTest} from "@/app/lib/db";
import {Card} from "@/app/lib/types";
import Link from "next/link";
import GoBackButton from "@/app/components/GoBackButton";
import StartHolder from "@/app/start/[deck_id]/components/StartHolder";


export default async function Page({ params }: { params: Promise<{ deck_id: string }> }){
    const { deck_id } = await params;
    const cards = await getCardsForTest(deck_id)

    return (
        <>
            <GoBackButton href={'/'} />
            <StartHolder cards={cards}></StartHolder>
        </>
    )
}


