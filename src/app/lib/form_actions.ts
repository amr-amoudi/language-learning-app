'use server'

import { z } from 'zod'
import {createNewCard, createNewDeck, deleteCard, deleteDeck, updateCard, updateDeck} from './db';
import { ActionResult } from './types';
import returnErrorMessages from '../util/return-error-messages';

const CreateDeckSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

const CreateCardSchema = z.object({
  word: z.string({ error: "word must be text" }).min(1, "word is required"),
  meaning: z.string({ error: "meaning must be text" }).min(1, "meaning is required"),
  description: z.string().optional()
})

const UpdateCardSchema = z.object({
    word: z.string({ error: "word must be text" }).min(1, "word is required").optional(),
    meaning: z.string({ error: "meaning must be text" }).min(1, "meaning is required").optional(),
    description: z.string().optional()
})

function returnServerErrors(): ActionResult {
  return {
    errors: ['internal server error'],
    succeeded: false,
  }
}

export async function createDeckAction(prevState: unknown, formData: FormData): Promise<ActionResult> {
  const validatedFields = CreateDeckSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: returnErrorMessages({ errors: validatedFields.error.flatten().fieldErrors }),
      succeeded: false,
    };
  }

  try {
    const newDeck = await createNewDeck('c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9', validatedFields.data.name);

    return {
      succeeded: true,
      successValue: newDeck,
      errors: null
    };
  } catch (e) {
    console.log(e);
    return returnServerErrors();
  }
}

export async function deleteCardFromAction(_: unknown, __: FormData, cardId: string): Promise<ActionResult> {

    try {
        console.log('im on the server')
        await deleteCard(cardId)

        return {
            succeeded: true,
            successValue: { cardId },
            errors: null
        };
    } catch (e) {
        console.log(e);
        return returnServerErrors();
    }
}

export async function deleteDeckFromAction(_: unknown, __: FormData, deckId: string): Promise<ActionResult> {
    try {
        await deleteDeck(deckId)

        return {
            succeeded: true,
            successValue: { deckId },
            errors: null
        };
    } catch (e) {
        console.log(e);
        return returnServerErrors();
    }
}

export async function createNewCardAction(prevState: unknown, formData: FormData, deckId: string): Promise<ActionResult> {
  const validatedFields = CreateCardSchema.safeParse({
    word: formData.get('word'),
    meaning: formData.get('meaning'),
    description: formData.get('description')
  })

  if (!validatedFields.success) {
    return {
      errors: returnErrorMessages({ errors: validatedFields.error.flatten().fieldErrors }),
      succeeded: false
    }
  }

  try {
    const result = await createNewCard({ userId: 'c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9', deckId, ...validatedFields.data }) // validatedFields.data is guaranteed to have word, meaning, and description could be null
    return {
        successValue: result,
        errors: [],
        succeeded: true
    }
  } catch (e) {
    console.log(e)
    return returnServerErrors()
  }
}

export async function updateCardAction(prevState: unknown, formData: FormData, cardId: string): Promise<ActionResult> {
    const validatedFields = CreateCardSchema.safeParse({
        word: formData.get('word'),
        meaning: formData.get('meaning'),
        description: formData.get('description')
    })

    if (!validatedFields.success) {
        return {
            errors: returnErrorMessages({ errors: validatedFields.error.flatten().fieldErrors }),
            succeeded: false
        }
    }

    try {
        const result = await updateCard(cardId, validatedFields.data.word, validatedFields.data.meaning, validatedFields.data.description)
        console.log(result)
        return {
            successValue: result,
            errors: [],
            succeeded: true
        }
    } catch (e) {
        console.log(e)
        return returnServerErrors()
    }
}

export async function updateDeckFormAction(prevState: unknown, formData: FormData, deckId: string): Promise<ActionResult> {
    const validatedFields = CreateDeckSchema.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
            errors: returnErrorMessages({ errors: validatedFields.error.flatten().fieldErrors }),
            succeeded: false,
        };
    }

    try {
        const updatedDeck = await updateDeck(deckId, validatedFields.data.name);

        return {
            succeeded: true,
            successValue: updatedDeck,
            errors: null
        };
    } catch (e) {
        console.log(e);
        return returnServerErrors();
    }
}

