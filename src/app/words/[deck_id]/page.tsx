// server component
import { setActiveDeck } from "@/app/lib/db";

import { Suspense } from "react";
import CardsHolder from "@/app/words/[deck_id]/CardsHolder";
import CardsSkeleton from "@/app/words/[deck_id]/CardsSkeleton";
import Link from "next/link";
import {buttonClasses} from "@/app/lib/reuse-classes";
import {getUserIdFromToken} from "@/app/auth/utils";

export default async function CardsFromDeckId({ params }: { params: Promise<{ deck_id: string }> }) {
    const { deck_id } = await params;

    try {
        await setActiveDeck(deck_id, await getUserIdFromToken());
        console.log('changed active deck');
    } catch (e) {
        console.error("Error setting active deck:", e);
    }

    return (
        <>
            <Suspense fallback={<CardsSkeleton />}>
                <CardsHolder deckId={deck_id} />
            </Suspense>
        </>
    );
}
