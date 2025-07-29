'use server'

import { z } from 'zod'
import { createNewDeck } from './db';
import { ActionResult } from './types';

const CreateDeckSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

function returnServerErrors() {
  return {
    errors: { serverError: ['internal server error'] },
    message: 'there is a problem'
  }
}

export async function createDeckAction(prevState: unknown, formData: FormData): Promise<ActionResult> {
  const validatedFields = CreateDeckSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  try {
    const newDeck = await createNewDeck('c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9', validatedFields.data.name);

    return {
      message: 'ok',
      successValue: newDeck,
    };
  } catch (_) {
    return returnServerErrors();
  }
}

