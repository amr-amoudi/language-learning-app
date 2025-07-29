'use server'

import postgres from "postgres"
import { Deck, Card } from "./types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: false })

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
    SELECT * FROM cards WHERE deck_id = ${deckId}
  `

  return cards
}


export {
  getUsers,
  getDecksForUser,
  getCardsForCurrentDeck,
  createNewDeck,
}
