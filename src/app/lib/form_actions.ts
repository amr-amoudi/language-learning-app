'use server'

import { z } from 'zod'
import {
    createNewCard, createNewDeck, createNewUser, deleteCard, deleteDeck,
    getUsersByNameAndPassword, updateCard, updateCardsMark, updateDeck
} from './db';
import {ActionResult, Result, User} from './types';
import returnErrorMessages from '../util/return-error-messages';
import { redirect } from "next/navigation"
import {LogIn} from "@/app/auth/LogIn";
import {getUserIdFromToken} from "@/app/auth/utils";
import {asyncWrapProviders} from "node:async_hooks";

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

const credentialsSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
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
    const newDeck = await createNewDeck(await getUserIdFromToken(), validatedFields.data.name);

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
    const userId = await getUserIdFromToken();
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
    const result = await createNewCard({ userId: userId , deckId, ...validatedFields.data }) // validatedFields.data is guaranteed to have word, meaning, and description could be null
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

export async function submitResultsAction(prevState: unknown, formData: FormData, results: Result[]): Promise<void> {
  try {
    console.log('Results:', results);
    await updateCardsMark(results)
  } catch (e) {
    console.log(e)
  }


  redirect("/")
}

export async function LoginAction(prevState: unknown, formData: FormData): Promise<ActionResult> {
    const validatedFields = credentialsSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
            errors: returnErrorMessages({ errors: validatedFields.error.flatten().fieldErrors }),
            succeeded: false,
        };
    }

    try {
        const userId = await getUsersByNameAndPassword(validatedFields.data?.username, validatedFields.data?.password);
        if(userId.length === 0){
            return {
                errors: ["Invalid username or password"],
                succeeded: false,
            }
        }
        await LogIn(userId[0].id)
    }catch (e) {
        console.log(e)
    }

    redirect("/words")
}


export default async function SignUpAction(prevState: unknown, formData: FormData): Promise<ActionResult>{
    const validatedFields = credentialsSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
            errors: returnErrorMessages({errors: validatedFields.error.flatten().fieldErrors}),
            succeeded: false,
        };
    }

    try {
        const user = await createNewUser(validatedFields.data.username, validatedFields.data.password);
        await LogIn(user[0].id)
    }catch (e) {
        if (e instanceof Error) {
            console.log(e.message.includes("duplicate"));
            return {
                errors: e.message.includes("duplicate") ? ["Username already exists"] : [e.message],
                succeeded: false,
            }
        } else {
            console.log("Unknown error", e);
            throw new Error("Something went wrong");
        }
    }

    redirect("/words")
}