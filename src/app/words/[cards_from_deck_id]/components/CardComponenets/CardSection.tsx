'use client';

import {Card} from "@/app/lib/types";
import React from "react";

interface CardSectionProps {
    children: React.ReactNode;
    cards: Card[];
}

interface CardSectionContextType {
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export const CardSectionContext = React.createContext<CardSectionContextType>({ cards: [], setCards: () => {} })


export default function CardSection({ children, cards }: CardSectionProps) {
    const [cardsState, setCardsState] = React.useState(cards);

    return (
        <CardSectionContext.Provider value={{ cards: cardsState, setCards: setCardsState }}>
            <div>
                {children}
            </div>
        </CardSectionContext.Provider>
    )
}


