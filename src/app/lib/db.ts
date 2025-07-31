'use server'

import postgres from "postgres"
import { Deck, Card } from "./types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;

  return users;
}

async function getDecksForUser(userId: string): Promise<Deck[]> {
  const decks = await sql<Deck[]>`
    SELECT * FROM decks WHERE user_id = ${userId} ORDER BY is_active DESC;
  `;

  return decks;
}


async function createNewDeck(userId: string, name: string) {
  try {
    await sql`
      UPDATE decks
      SET is_active = false
      WHERE user_id = ${userId} AND is_active = true RETURNING *;
    `;

    const newDeck = await sql`
      INSERT INTO decks (name, user_id, is_active)
      VALUES (${name}, ${userId}, true)
      RETURNING *;
    `;

    return newDeck;
  } catch (err) {
    throw err;
  }
}


async function getCardsForCurrentDeck(deckId: string): Promise<Card[]> {
  const cards = sql<Card[]>`
    SELECT * FROM cards WHERE deck_id = ${deckId};
  `

  return cards
}

async function createWord(word: string) {
  const newWord = sql`
          WITH ins AS (
            INSERT INTO words (word)
            VALUES (${word})
            ON CONFLICT (${word}) DO NOTHING
            RETURNING *
          )
          SELECT * FROM ins
          UNION
          SELECT * FROM words WHERE word = ${word};`;
  return newWord;
}

async function getAllCards(deck_id: string): Promise<{ id: string, word: string }[]> {
  const cards = sql<{ id: string, word: string }[]>`
            SELECT w.word, w.id
            FROM deck_cards dc
            JOIN decks d ON d.id = dc.deck_id
            JOIN cards c ON c.id = dc.card_id
            JOIN LATERAL (
              SELECT word, id FROM words WHERE id = c.word_id
              UNION
              SELECT word, id FROM words WHERE id = c.meaning_id
            ) w ON true
            where dc.deck_id = ${deck_id};
            `
  return cards;
}

async function createNewCard({ userId, word, meaning, description }: { userId: string, word: string, meaning: string, description: string }) {

}

export {
  getUsers,
  getDecksForUser,
  getCardsForCurrentDeck,
  createNewDeck,
  createNewCard,
  getAllCards
}
