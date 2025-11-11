"use client";
import SubmitButton from "@/app/components/SubmitButton";
import { submitResultsAction } from "@/app/lib/form_actions";
import { buttonClasses } from "@/app/lib/reuse-classes";
import { Result } from "@/app/lib/types";
import { useContext } from "react";
import { CardsData } from "./CardsDataHolder";
import Cards from "@/app/words/[deck_id]/components/CardComponenets/Cards";

export default function SessionCompleted({ results }: { results: Result[] }) {
  const { cards } = useContext(CardsData);
    cards.map((card,index) => card.card_id === results[index]?.card_id)
  return (
    <form
      action={async (formData: FormData) => {
        await submitResultsAction("", formData, results);
      }}
      className="flex flex-col items-center justify-center my-20"
    >
      <h1 className="text-app_orange mb-10 text-center text-3xl">Session Completed!</h1>
      <p className="text-2xl text-app_yellow mb-20 text-center">
        Great job on completing your session. Keep up the good work!
      </p>
      <Cards cardsProp={cards.map((card, index) => {
          if(results[index]?.passed) {
              return { ...card, mark: card.mark + 5 };
          }else if(!results[index]?.passed && card.mark >= 5){
              return { ...card, mark: card.mark - 5 };
          }else return card
      })}></Cards>
      <div>
        <SubmitButton className={`${buttonClasses}`} type="submit">
          Go Home
        </SubmitButton>
      </div>
    </form>
  );
}


