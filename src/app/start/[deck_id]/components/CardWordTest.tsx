

// ask the user to recall the word of the card
import {Card} from "@/app/lib/types";

export default function CardWordTest({ card }: { card: Card }) {
    return (
        <div className={"my-5"}>
            <h1>What did that mean?: &#34;{ card.meaning }&#34;</h1>
            <form>
                <input type="text" name="userWord" className={"border-2 border-gray-300 rounded-md p-2 w-full"} />
                <button type="submit" className={"mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"}>Submit</button>
            </form>
        </div>
    )
}