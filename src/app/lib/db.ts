'use server'

import postgres from "postgres"
import {Card, CreateNewCard, Deck, ReturnedCard, Word} from "./types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

export async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;

  return users;
}

export async function getDecksForUser(userId: string): Promise<Deck[]> {
  return sql<Deck[]>`
    SELECT *
    FROM decks
    WHERE user_id = ${userId}
    ORDER BY is_active DESC;
  `;
}


export async function createNewDeck(userId: string, name: string) {
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

export async function createWord(word: string): Promise<Word[]> {
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

export async function getCardsForCurrentDeck(deck_id: string): Promise<Card[]> {
  return sql<Card[]>`
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
            WHERE dc.deck_id = ${deck_id}
            ORDER BY c.created_at DESC;`
}

export async function createNewCard({ userId, word, meaning, description, deckId }: CreateNewCard): Promise<Card> {
    try {
        const createdWord = await createWord(word);
        const createdMeaning = await createWord(meaning);

        if (createdWord.length === 0 || createdMeaning.length === 0) {
          throw new Error('Failed to create word or meaning');
        }

        const newCard = await sql<Card[]>`
          INSERT INTO cards (word_id, meaning_id, description, user_id)
          VALUES (${createdWord[0].id}, ${createdMeaning[0].id}, ${description || null}, ${userId})
          RETURNING id as card_id, *;`

        if (newCard.length === 0) {
          throw new Error('Failed to create card');
        }

        await sql`
          INSERT INTO deck_cards (deck_id, card_id)
          VALUES (${deckId}, ${newCard[0].card_id});
        `;

        return { card_id: newCard[0].card_id, word: createdWord[0].word, meaning: createdMeaning[0].word, description: newCard[0].description, user_id: newCard[0].user_id };
    } catch (err) {
        throw err;
    }
}

export async function setActiveDeck(deckId: string, userId: string) {
    try {
        return sql`
            UPDATE decks
            SET is_active =
                    CASE
                        WHEN id != ${deckId} THEN false
                        WHEN id = ${deckId} THEN true
                        END
            WHERE user_id = ${userId}
            RETURNING *;
        `;
    } catch (err) {
        throw err;
    }
}

export async function deleteCard(cardId: string) {
        return sql`
        DELETE FROM cards
        WHERE id = ${cardId};`;
}

export async function updateCard(cardId: string, word: string, meaning: string, description?: string): Promise<Card[]> {
    const createdWord = await createWord(word);
    const createdMeaning = await createWord(meaning);



    return sql<Card[]>`
        WITH u as (
            UPDATE cards
            SET word_id = ${createdWord[0].id}, meaning_id = ${createdMeaning[0].id} ,description = ${description || null}
            WHERE id = ${cardId}
            RETURNING id AS card_id, *
        )
        SELECT w.word, m.word as meaning, u.description, u.id as card_id, u.user_id FROM u
        JOIN words w ON u.word_id = w.id
        JOIN words m ON u.meaning_id = m.id
        ;
    `
}
