// server component
import {getCardsForCurrentDeck, setActiveDeck} from "@/app/lib/db";
import CardComponent from "@/app/words/components/CardComponent";
import {ReturnedCard} from "@/app/lib/types";
import CardFace from "@/app/words/components/CardFace";
import CardBack from "@/app/words/components/CardBack";

export default async function CardsFromDeckId({ params }: { params: { cards_from_deck_id: string } }) {
    const { cards_from_deck_id } = await params;
    const cards: ReturnedCard[] = await getCardsForCurrentDeck(cards_from_deck_id);

    try{
        await setActiveDeck(cards_from_deck_id, 'c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9');
    }catch (e){
        console.error("Error setting active deck:", e);
    }


    if(cards.length === 0) {
        return <div className="text-app_yellow text-center">No cards found for this deck.</div>;
    }

    return (
        <>
            {
                cards.map((card) => (
                    <CardComponent key={card.id} id={card.id} description={card.description}>
                        <CardFace key={card.id}>
                            {card.word}
                        </CardFace>
                        <CardBack key={card.id}>
                            {card.meaning}
                        </CardBack>
                    </CardComponent>
                ))
            }
        </>
    )
}

