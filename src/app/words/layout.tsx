// server component
import DecksContent from "@/app/words/components/DecksContent";
import {getDecksForUser} from "@/app/lib/db";
import Link from "next/link";

export default async function Layout({children}: {children: React.ReactNode}) {
    const decks = await getDecksForUser('c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9');

    return (
    <>
        <Link className="absolute top-3.5 left-2 text-app_yellow font-bold text-direct underline outline-none" href={'/'}>Go Back</Link>
        <DecksContent decks={decks}></DecksContent>
        {children}
    </>
  )
}


