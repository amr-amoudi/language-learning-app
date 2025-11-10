// app/auth/actions.ts
"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.KEY || "secret");

export async function encrypt(userId: string) {
    return await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(5 * 60 * 60 * 24)
        .sign(key);
}

export async function decrypt(input: string) {
    console.log(input)
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"]
    });

    return payload;
}

