"use client";

import CardComponent from "@/app/words/[deck_id]/components/CardComponenets/CardComponent";
import CardFace from "@/app/words/[deck_id]/components/CardComponenets/CardFace";
import CardBack from "@/app/words/[deck_id]/components/CardComponenets/CardBack";
import {useContext} from "react";
import {CardSectionContext} from "@/app/words/[deck_id]/components/CardComponenets/CardSection";

export default function Cards(){
    const { cards, setCards } = useContext(CardSectionContext);

    if(cards.length === 0){
        return <div className="text-app_yellow text-center">there are no Cards, maybe add some🤗</div>
    }

    return (
        <div>
            {cards.map((card) => {
                return (
                    <CardComponent key={card.card_id + Date()} cardsContext={{ cards, setCards }} id={card.card_id} description={card.description}>
                        <CardFace key={card.word + card.card_id}>
                            {card.word}
                        </CardFace>
                        <CardBack key={card.card_id + card.meaning}>
                            {card.meaning}
                        </CardBack>
                    </CardComponent>
            )})}
        </div>
    )
}


