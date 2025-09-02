// server component
import { getCardsForCurrentDeck, setActiveDeck } from "@/app/lib/db";
import { Card } from "@/app/lib/types";
import CreateCardLayout from "@/app/words/components/CreateCardLayout";
import CardSection from "@/app/words/[cards_from_deck_id]/components/CardComponenets/CardSection";
import Cards from "@/app/words/[cards_from_deck_id]/components/CardComponenets/Cards";
import BoxSkeleton from "@/app/components/Skeletons/BoxSkeleton";

export default async function CardsHolder({ id }: { id: string }) {
    const cards: Card[] = await getCardsForCurrentDeck( id);

    try {
        await setActiveDeck(id, 'c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9');
    } catch (e) {
        console.error("Error setting active deck:", e);
    }

    return (
        <CardSection cards={cards} >
            <CreateCardLayout />
            <Cards />
        </CardSection>
    );
}