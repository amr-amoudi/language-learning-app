'use client'

import { Deck } from "@/app/lib/types";
import DecksSlider from "./DecksSlider";
import { Dispatch, ReactHTMLElement, ReactNode, ReducerState, SetStateAction, useReducer, useState } from "react";
import PhoneModal from "@/app/components/PhoneModal";
import { buttonClasses } from "@/app/lib/reuse-classes";
import FormForModals from "@/app/components/FormForModals";
import { createDeckAction } from "@/app/lib/form_actions";

interface OpenModalContent {
  html: ReactNode;
  isClosed: boolean
}

enum reducerActionsKinds {
  decks = 'decks',
  currentDeck = 'current-deck',
  isClosed = 'is-closed',
  modalHtml = 'modal-html'
}

interface reducerState {
  decks: Deck[],
  currentDeck: string,
  isClosed: boolean,
  modalHtml: ReactNode
}

interface reducerActions {
  type: reducerActionsKinds[],
  decks?: Deck[],
  currentDeck?: string,
  isClosed?: boolean,
  modalHtml?: ReactNode
}

function reducer(state: reducerState, actions: reducerActions): reducerState {
  const newState = { ...state }

  actions.type.forEach(currentType => {
    switch (currentType) {
      case 'is-closed':
        newState.isClosed = actions.isClosed ?? newState.isClosed
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

export default function WordsPageContent({ decks }: { decks: Deck[] }) {
  const [current, update] = useReducer(reducer, { decks: decks, currentDeck: '', isClosed: true, modalHtml: <></> })

  function openCreateDeckModal() {
    update({
      type: [reducerActionsKinds.isClosed, reducerActionsKinds.modalHtml],
      isClosed: false,
      modalHtml: <div className="flex justify-center items-center flex-col">
        <label className="text-start self-start px-3" htmlFor="name">name: </label>
        <input id="name" placeholder="eg. first deck" name="name" className="border-2 border-app_red-dark rounded-sm bg-app_blue outline-none px-4 py-2 w-[95%]" />
      </div>
    })
  }

  // function updateDecksState(newState: Deck[]) {
  //   update({ type: [reducerActionsKinds.decks], decks: decks })
  // }

  function setCurrentDeck(currentDeckVale: string) {
    update({ type: [reducerActionsKinds.currentDeck], currentDeck: currentDeckVale })
  }

  function setIsClosed(value: boolean) {
    update({ type: [reducerActionsKinds.isClosed], isClosed: value })
  }

  return (
    <div className="h-screen w-screen">
      <div className="w-full z-4 my-8 relative mx-auto text-center flex justify-center items-center">
        <button onClick={openCreateDeckModal} className={buttonClasses}>Create New Deck</button>
      </div>
      <DecksSlider decks={decks} setCurrentDeck={setCurrentDeck as Dispatch<SetStateAction<string>>}></DecksSlider>
      <PhoneModal isClosed={current.isClosed} setIsClosed={setIsClosed as Dispatch<SetStateAction<boolean>>}>
        <FormForModals buttonText="create" action={createDeckAction} isOpen={!current.isClosed}>
          {current.modalHtml}
        </FormForModals>
      </PhoneModal>
    </div>
  )
}
