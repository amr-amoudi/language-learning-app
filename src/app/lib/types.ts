

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
}

export type Card = {
  id: string,
  word_id: string,
  meaning_id: string,
  description: string,
  user_id: string,
}

export type ActionResult = {
  succeeded?: boolean;
  errors?: Record<string, string[]>;
  successValue?: unknown;
};



