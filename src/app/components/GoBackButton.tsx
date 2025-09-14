'use client'

import Link from "next/link";
import {useSearchParams} from "next/navigation";


export default function GoBackButton({href}: { href?: string}){
    const useParams = useSearchParams();

    console.log(useParams.get('source'), href , '/')

    return (
        <Link
            className="absolute top-3.5 left-2 text-app_yellow font-bold text-direct underline outline-none"
            href={useParams.get('source') || href || '/'}>
            Go Back
        </Link>
    )
}