'use client'

import {ActionResult, Deck, ReturnedCard} from "@/app/lib/types";
import { ReactNode, useReducer } from "react";
import CreateDeckFormElements from "@/app/components/CreateDeckFormElements";
import CreateCardFormElements from "@/app/components/CreateCardFormElements";


enum reducerActionsKinds {
  decks = 'decks',
  currentDeck = 'current-deck',
  isOpen = 'is-Open',
  modalHtml = 'modal-html'
}

interface reducerState {
  decks: Deck[],
  currentDeck: string,
  isOpen: boolean,
  modalHtml: ReactNode
}

interface reducerActions {
  type: reducerActionsKinds[],
  decks?: Deck[],
  currentDeck?: string,
  isOpen?: boolean,
  modalHtml?: ReactNode
}

function reducer(state: reducerState, actions: reducerActions): reducerState {
  const newState = { ...state }

  actions.type.forEach(currentType => {
    switch (currentType) {
      case 'is-Open':
        newState.isOpen = actions.isOpen ?? newState.isOpen
        break;
      case 'decks':
        newState.decks = actions.decks ?? newState.decks
        break;
      case 'modal-html':
        newState.modalHtml = actions.modalHtml ?? newState.modalHtml
        break;
      case 'current-deck':
        newState.currentDeck = actions.currentDeck ?? newState.currentDeck
        break;
      default:
        break;
    }
  })

  return newState;
}

export default function WordsPageContent({ decks, cards }: { decks: Deck[], cards: ReturnedCard[] }) {
  const [current, update] = useReducer(reducer, { decks: decks, currentDeck: '', isOpen: false, modalHtml: <></> })

  function openCreateDeckModal() {
    update({
      type: [reducerActionsKinds.isOpen, reducerActionsKinds.modalHtml],
      isOpen: true,
      modalHtml: <CreateDeckFormElements updateDecksState={updateDecksState} />
    })
  }

  function openCreateCardModal() {
    update({
      type: [reducerActionsKinds.isOpen, reducerActionsKinds.modalHtml],
      isOpen: true,
      modalHtml: <CreateCardFormElements deckId={current.currentDeck} />
    })
  }

  function updateDecksState(data: ActionResult) {
    update({ type: [reducerActionsKinds.decks], decks: [(data.successValue as Deck[])[0], ...current.decks] })
  }

  function setCurrentDeck(currentDeckVale: string) {
    update({ type: [reducerActionsKinds.currentDeck], currentDeck: currentDeckVale })
  }

  function setIsOpen(value: boolean) {
    update({ type: [reducerActionsKinds.isOpen], isOpen: value })
  }

  return (
    <div className="h-screen w-screen">
      {/* modal */}

    </div>
  )
}
