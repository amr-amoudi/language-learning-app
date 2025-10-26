import {Card} from "@/app/lib/types";
import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";
import Hr from "@/app/components/Hr";

export default function WordIntroduction({ card }: { card: Card }) {

    return (
        <div className={"my-5 flex flex-col items-center justify-center"}>
            <h1 className={'text-center text-5xl text-app_orange mt-10'}>{ card.word }</h1>
            <p className={"text-app_yellow text-3xl"}> means: { card.meaning }</p>
            <Hr className={"max-w-[95%] m-auto"}/>
            {card.description && <p className={'text-app_orange text-2xl'}>{card.description}</p>}
            <NextPreviousFormButtons />
        </div>
    )
}

