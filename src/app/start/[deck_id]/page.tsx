import {getCardsForCurrentDeck} from "@/app/lib/db";
import {Card} from "@/app/lib/types";
import Link from "next/link";
import GoBackButton from "@/app/components/GoBackButton";


export default async function Page({ params }: { params: Promise<{ deck_id: string }> }){
    const { deck_id } = await params;
    const cards = await getCardsForCurrentDeck(deck_id)
    console.log(cards)

    return (
        <>
            <GoBackButton href={'/'} />
            {
                cards.map((card: Card) => <div key={card.card_id} className={'border-app_yellow border'}>{JSON.stringify(card)}</div>)
            }
        </>
    )
}


