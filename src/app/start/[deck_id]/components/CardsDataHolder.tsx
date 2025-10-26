"use client"
import {createContext, ReactNode} from "react";
import {Card} from "@/app/lib/types";


export const CardsData = createContext<{ cards: Card[] }>({ cards: [] })

export default function CardsDataHolder({ cards, children }: { cards: Card[], children: ReactNode }) {
    return (
        <CardsData.Provider value={{ cards }}>
            {children}
        </CardsData.Provider>
    )
}



