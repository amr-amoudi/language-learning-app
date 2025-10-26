
// ask the user to recall the meaning of the card
import {Card} from "@/app/lib/types";
import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";



export default function CardMeaningTest({ card }: { card: Card }) {
    return (
        <div className={"my-5"}>
            <h1>What is the meaning of: { card.word }?</h1>
            <form>
                <input type="text" name="userMeaning" className={"border-2 border-gray-300 rounded-md p-2 w-full"} />
                <button type="submit" className={"mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"}>Submit</button>
            </form>
            <NextPreviousFormButtons></NextPreviousFormButtons>
        </div>
    )
}
