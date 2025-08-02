'use server'

import postgres from "postgres"
import {Card, CreateNewCard, Deck, ReturnedCard, Word} from "./types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;

  return users;
}

async function getDecksForUser(userId: string): Promise<Deck[]> {
  return sql<Deck[]>`
    SELECT *
    FROM decks
    WHERE user_id = ${userId}
    ORDER BY is_active DESC;
  `;
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

async function createWord(word: string): Promise<Word[]> {
  return sql<Word[]>`
          WITH ins AS (
            INSERT INTO words (word)
            VALUES (${word})
            ON CONFLICT (word) DO NOTHING
            RETURNING *
          )
          SELECT * FROM ins
          UNION
          SELECT * FROM words WHERE word = ${word};`;
}

async function getCardsForCurrentDeck(deck_id: string): Promise<ReturnedCard[]> {
  return sql<ReturnedCard[]>`
          SELECT
            c.id AS card_id,
            word.word AS word,
            meaning.word AS meaning,
            c.description,
            c.user_id
          FROM
            deck_cards dc
              JOIN
            cards c ON c.id = dc.card_id
              JOIN
            words word ON c.word_id = word.id
              JOIN
            words meaning ON c.meaning_id = meaning.id
            WHERE dc.deck_id = ${deck_id};`
}

async function createNewCard({ userId, word, meaning, description, deckId }: CreateNewCard) {
    try {
        const createdWord = await createWord(word);
        const createdMeaning = await createWord(meaning);

        if (createdWord.length === 0 || createdMeaning.length === 0) {
          throw new Error('Failed to create word or meaning');
        }

        const newCard = await sql<Card[]>`
          INSERT INTO cards (word_id, meaning_id, description, user_id)
          VALUES (${createdWord[0].id}, ${createdMeaning[0].id}, ${description || null}, ${userId})
          RETURNING *;`

        if (newCard.length === 0) {
          throw new Error('Failed to create card');
        }

        await sql`
          INSERT INTO deck_cards (deck_id, card_id)
          VALUES (${deckId}, ${newCard[0].id});
        `;

        console.log(createdWord, createdMeaning, newCard)

        return newCard[0];
    } catch (err) {
        throw err;
    }
}

async function setActiveDeck(deckId: string, userId: string): Promise<void> {
    try {
        sql`
        UPDATE decks
        SET is_active = false
        WHERE id != ${deckId} AND user_id = ${userId};
      `;
    } catch (err) {
        throw err;
    }
}

export {
    getUsers,
    getDecksForUser,
    createNewDeck,
    createNewCard,
    getCardsForCurrentDeck,
    setActiveDeck
}
