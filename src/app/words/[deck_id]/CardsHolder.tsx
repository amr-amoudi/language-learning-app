// server component
import { getCardsForCurrentDeck, setActiveDeck } from "@/app/lib/db";
import { Card } from "@/app/lib/types";
import CreateCardLayout from "@/app/words/components/CreateCardLayout";
import CardSection from "@/app/words/[deck_id]/components/CardComponenets/CardSection";
import Cards from "@/app/words/[deck_id]/components/CardComponenets/Cards";
import {getUserIdFromToken} from "@/app/auth/utils";
import Link from "next/link";

export default async function CardsHolder({ deckId }: { deckId: string }) {
    const cards: Card[] = await getCardsForCurrentDeck(deckId);

    try {
        await setActiveDeck(deckId, await getUserIdFromToken());
    } catch (e) {
        console.error("Error setting active deck:", e);
    }

    return (
        <>
            <CardSection cards={cards} >
                <CreateCardLayout deckId={deckId}/>
                <Cards />
            </CardSection>

        </>
    );
}