import Link from "next/link";
import {buttonClasses} from "@/app/lib/reuse-classes";

export default function StartRedirect(){
    // this page is to redirect the user to /words cus its unlikely they got here intentionally

    return (
        <div className={"w-screen h-screen flex justify-center items-center flex-col"}>
            <div className={'w-[95%]'}>
                <h1 className={"text-app_yellow text-center mb-5 font-bold text-2xl"}>Looks like you dont have any decks available</h1>
                <Link href={"/words"} className={"m-auto text-center w-full" + buttonClasses}>You can create some here</Link>
            </div>
        </div>
    )
}

