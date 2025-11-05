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
  console.log(cards);

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
      <Cards cardsProp={cards}></Cards>
      <div>
        <SubmitButton className={`${buttonClasses}`} type="submit">
          Go Home
        </SubmitButton>
      </div>
    </form>
  );
}


