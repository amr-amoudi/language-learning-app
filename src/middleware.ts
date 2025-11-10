import {NextRequest} from "next/server";


export default function Middleware(req: NextRequest){
    const isLoggedIn = req.cookies.get('user_id')?.value;

    if(req.url.includes("/words") && !isLoggedIn){
        return Response.redirect(new URL(`/login`, req.url));
    }

    if(req.url.includes("/start") && !isLoggedIn){
        return Response.redirect(new URL(`/login`, req.url));
    }
}

