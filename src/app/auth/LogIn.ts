'use server';
import {encrypt} from "@/app/auth/utils";
import {cookies} from "next/headers";

export async function LogIn(userId: string){
    const token = await encrypt(userId);

    const cookieStore = await cookies()
    cookieStore.set({
        name: "user_id",
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // one month
        path: "/"
    })

}

