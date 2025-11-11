// server component
import DecksContent from "@/app/words/components/DecksContent";
import {getDecksForUser} from "@/app/lib/db";
import Link from "next/link";
import {decrypt} from "@/app/auth/utils";
import {cookies} from "next/headers";

export default async function Layout({children}: {children: React.ReactNode}) {
    const cookie = (await cookies()).get('user_id')?.value || "";
    const payload = await decrypt(cookie);
    const decks = await getDecksForUser(payload.userId as string);

    return (
    <>
        <Link className="absolute top-3.5 left-2 text-app_yellow font-bold text-direct underline outline-none" href={'/'}>Go Back</Link>
        <DecksContent decks={decks}>
            { children }
        </DecksContent>
    </>
  )
}