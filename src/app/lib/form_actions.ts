'use server'

import { z } from 'zod'
import { createNewDeck } from './db';
import { ActionResult } from './types';
import returnErrorMessages from '../util/return-error-messages';

const CreateDeckSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

const CreateCardSchema = z.object({
  word: z.string({ error: "word is required" }),
  meaning: z.string({ error: "meaning is required" }),
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

export async function createNewCard(prevState: unknown, formData: FormData): Promise<ActionResult> {
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

  return { successValue: '', errors: [], succeeded: false }
}

