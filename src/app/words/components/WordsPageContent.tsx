'use client'

import { ActionResult, Card, Deck } from "@/app/lib/types";
import DecksSlider from "./DecksSlider";
import { Dispatch, ReactNode, SetStateAction, useReducer } from "react";
import PhoneModal from "@/app/components/PhoneModal";
import { buttonClasses } from "@/app/lib/reuse-classes";
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

export default function WordsPageContent({ decks, cards }: { decks: Deck[], cards: { id: string, word: string }[] }) {
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
      modalHtml: <CreateCardFormElements />
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

      {/* create new deck button */}
      <div className={`w-full z-4 my-8 mx-auto text-center flex justify-center items-center relative text-semibold
                      ${current.decks.length === 0 ? 'h-screen ' : ''}`}>
        <button className={`${buttonClasses} ${current.decks.length === 0 ? 'absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2' : ''}`} onClick={openCreateDeckModal}>Create New Deck</button>
      </div>

      {/* deck slieder */}
      {current.decks.length > 0 && <DecksSlider decks={current.decks} setCurrentDeck={setCurrentDeck as Dispatch<SetStateAction<string>>}></DecksSlider>}

      {/* modal */}
      <PhoneModal isOpen={current.isOpen} setIsOpen={setIsOpen as Dispatch<SetStateAction<boolean>>}>
        {current.modalHtml}
      </PhoneModal>


      <div className="w-screen flex justify-center text-center flex-col
                      items-center border-t-app_yellow border-1
                      bg-transparent border-x-0 border-b-0 mt-5 font-semibold text-changer">
        <button onClick={openCreateCardModal} className="w-[80%] border-app_yellow bg-transparent-orange py-2.5 px-1
                            rounded-lg border-2 text-3xl flex items-center justify-center
                            my-5 text-app_red-dark h-[60px] overflow-hidden relative bg-transperint-orange cursor-pointer">
          {/* the spin animation lives here */}
          <div className="roles-slider">
            <span className="role">+</span>
            <span className="role">Create A Card</span>
            <span className="role">Add Words</span>
            <span className="role">+</span>
          </div>
        </button>
      </div>

      {cards.map(x => <div key={x.id}>{x.word}</div>)}

    </div>
  )
}
