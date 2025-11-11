// app/auth/actions.ts
"use server";

import { SignJWT, jwtVerify } from "jose";
import {cookies} from "next/headers";

const key = new TextEncoder().encode(process.env.KEY || "secret");

export async function encrypt(userId: string) {
    return await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(process.env.SESSION_TIME || "43829 min")
        .sign(key);
}

export async function decrypt(input: string) {
    console.log(input)
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"]
    });

    return payload;
}

export async function getUserIdFromToken(): Promise<string> {
    const cookieData = await cookies()
    const token = cookieData.get('user_id')?.value || "";
    const payload = await decrypt(token);
    return payload.userId as string;
}

