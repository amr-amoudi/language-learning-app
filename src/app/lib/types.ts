export type User = {
    id: string,
    name: string,
    password: string,
    createdAt: string
}

export type Deck = {
    id: string,
    name: string,
    userId: string,
    isActive: boolean,
}

export type Card = {
    card_id: string,
    word: string,
    meaning: string,
    description: string,
    user_id: string,
    mark: number
}

export type CardFromDB = {
    card_id: string,
    word_id: string,
    meaning_id: string,
    description: string,
    user_id: string,
}

export type Word = {
    id: string,
    word: string,
}

export interface ActionResult<T = unknown> {
    errors: string[] | null;
    succeeded: boolean;
    successValue?: T;
}

export type ReturnedCard = {
    id: string;
    word: string;
    meaning: string;
    description: string;
}

export type CreateNewCard = {
    userId: string;
    word: string;
    meaning: string;
    description?: string;
    deckId: string;
}

export interface Result {
    card_id: string;
    passed: boolean;
}
