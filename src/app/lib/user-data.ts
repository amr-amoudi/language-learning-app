'use server'


import {cookies} from "next/headers";
import {decrypt} from "@/app/auth/utils";


export async function getUserId(){
    try {
        const cookie = (await cookies()).get('user_id')?.value || "";
        const payload = await decrypt(cookie);
        return payload.userId as string;
    }catch (e){
        return null;
    }
}



