// server component
import {getCardsForCurrentDeck, setActiveDeck} from "@/app/lib/db";
import {Card} from "@/app/lib/types";
import CreateCardLayout from "@/app/words/components/CreateCardLayout";
import CardSection from "@/app/words/components/CardSection";
import Cards from "@/app/words/components/Cards";

export default async function CardsFromDeckId({ params }: { params: { cards_from_deck_id: string } }) {
    const { cards_from_deck_id } = await params;
    const cards: Card[] = await getCardsForCurrentDeck(cards_from_deck_id);

    try{
        await setActiveDeck(cards_from_deck_id, 'c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9');
    }catch (e){
        console.error("Error setting active deck:", e);
    }


    return (
        <CardSection cards={cards}>
            <CreateCardLayout />
            <Cards/>
        </CardSection>
    )
}

