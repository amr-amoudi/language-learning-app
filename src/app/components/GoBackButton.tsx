'use client'

import Link from "next/link";
import {useSearchParams} from "next/navigation";


export default function GoBackButton({href}: { href?: string}){
    const useParams = useSearchParams();
    let to = "/";

    if(useParams.get('source')){
        to = "/" + useParams.get('source');
    } else if(href){
        to = href;
    }

    return (
        <Link
            className="absolute top-3.5 left-2 text-app_yellow font-bold text-direct underline outline-none"
            href={to}>
            Go Back
        </Link>
    )
}