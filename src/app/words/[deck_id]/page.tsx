// server component
import { setActiveDeck } from "@/app/lib/db";

import { Suspense } from "react";
import CardsHolder from "@/app/words/[deck_id]/CardsHolder";
import CardsSkeleton from "@/app/words/[deck_id]/CardsSkeleton";
import Link from "next/link";
import {buttonClasses} from "@/app/lib/reuse-classes";

export default async function CardsFromDeckId({ params }: { params: Promise<{ deck_id: string }> }) {
    const { deck_id } = await params;

    try {
        await setActiveDeck(deck_id, 'c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9');
        console.log('changed active deck');
    } catch (e) {
        console.error("Error setting active deck:", e);
    }

    return (
        <>
            <Suspense fallback={<CardsSkeleton />}>
                <CardsHolder deckId={deck_id} />
            </Suspense>
            <Link href={`/start/` + (deck_id) + "?source=words"} className={buttonClasses + 'absolute left-0 bottom-0 right-0'}>Start!</Link>
        </>
    );
}
