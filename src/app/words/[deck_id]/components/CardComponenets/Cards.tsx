"use client";

import CardComponent from "@/app/words/[deck_id]/components/CardComponenets/CardComponent";
import CardFace from "@/app/words/[deck_id]/components/CardComponenets/CardFace";
import CardBack from "@/app/words/[deck_id]/components/CardComponenets/CardBack";
import { Dispatch, SetStateAction, useContext } from "react";
import { CardSectionContext } from "@/app/words/[deck_id]/components/CardComponenets/CardSection";
import CardProgressBar from "@/app/components/CardProgressBar";
import { Card } from "@/app/lib/types";

export default function Cards({ cardsProp, setCardsProp }: { cardsProp?: Card[], setCardsProp?: Dispatch<SetStateAction<Card[]>> }) {
  const { cards, setCards } = useContext(CardSectionContext);


  if ((cardsProp || cards).length === 0) {
    return <div className="text-app_yellow text-center">there are no Cards, maybe add some</div>
  }

  return (
    <div>
      {(cardsProp || cards).map((card) => {

        return (
          <CardComponent mark={card.mark} key={card.card_id + Date()} cardsContext={{ cards: (cardsProp || cards), setCards: (setCardsProp || setCards) }} id={card.card_id} description={card.description} >
            <CardFace key={card.word + card.card_id}>
              {card.word}
            </CardFace>
            <CardBack key={card.card_id + card.meaning}>
              {card.meaning}
            </CardBack>
          </CardComponent>
        )
      })}
    </div >
  )
}


