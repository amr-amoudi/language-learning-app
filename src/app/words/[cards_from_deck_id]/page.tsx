// server component
import { getCardsForCurrentDeck, setActiveDeck } from "@/app/lib/db";
import { Card } from "@/app/lib/types";

import {Suspense} from "react";
import CardsHolder from "@/app/words/[cards_from_deck_id]/CardsHolder";
import CardsSkeleton from "@/app/words/[cards_from_deck_id]/CardsSkeleton";
import BoxSkeleton from "@/app/components/Skeletons/BoxSkeleton";
import CardSection from "@/app/words/[cards_from_deck_id]/components/CardComponenets/CardSection";

export default async function CardsFromDeckId({ params }: { params: Promise<{ cards_from_deck_id: string }> }) {
    const { cards_from_deck_id } = await params;
    const cards: Card[] = await getCardsForCurrentDeck( cards_from_deck_id);

    try {
        await setActiveDeck(cards_from_deck_id, 'c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9');
        console.log('changed active deck');
    } catch (e) {
        console.error("Error setting active deck:", e);
    }

    return (
        <Suspense fallback={<CardsSkeleton/>}>
            <CardsHolder deckId={cards_from_deck_id}/>
        </Suspense>
    );
}