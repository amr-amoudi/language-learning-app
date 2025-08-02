import Link from "next/link"
import { getCardsForCurrentDeck, getDecksForUser } from "../lib/db"
import {Deck, ReturnedCard} from "../lib/types"

export default async function WordsPage() {
  const decks: Deck[] = await getDecksForUser('c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9')
  let cards: ReturnedCard[] = []
  if (decks.length > 0) {
    cards = await getCardsForCurrentDeck(decks[0].id)
  }

  return (
    <>
      <Link className="absolute top-3.5 left-2 text-app_yellow font-bold text-direct underline outline-none" href={'/'}>Go Back</Link>
    </>
  )
}
