import Link from "next/link"
import { getDecksForUser } from "../lib/db"
import { Deck } from "../lib/types"
import WordsPageContent from './components/WordsPageContent'

export default async function WordsPage() {
  const decks: Deck[] = await getDecksForUser('c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9')

  return (
    <>
      <Link href={'/'}>go back</Link>
      <WordsPageContent decks={decks}></WordsPageContent>
    </>
  )
}
