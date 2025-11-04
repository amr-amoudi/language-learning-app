'use client'
import SubmitButton from "@/app/components/SubmitButton";
import { submitResultsAction } from "@/app/lib/form_actions";
import { usePathname, useRouter } from "next/navigation";
import { Result } from "@/app/lib/types";

export default function SessionCompleted({ results }: { results: Result[] }) {
  const router = useRouter();
  const deckId = usePathname().split("/")[2] ?? "";

  return (
    <form
      action={async (formData: FormData) => {
        await submitResultsAction("", formData, deckId, results);
      }}
      className="flex flex-col items-center justify-center my-20"
    >
      <h1 className="text-5xl text-app_orange mb-10">Session Completed!</h1>
      <p className="text-2xl text-app_yellow mb-20">
        Great job on completing your session. Keep up the good work!
      </p>
      <div>
        <SubmitButton type="submit" onClick={() => router.replace("/")}>
          Go Home
        </SubmitButton>
      </div>
    </form>
  );
}


