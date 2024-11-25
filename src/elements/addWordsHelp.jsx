import addWordGif from "../assets/add-word-gif.gif"
import Banner from "../extra/banner.jsx";


export default function AddWordsHelp() {
    return(
        <div>
            <details>
                <summary>Add Words</summary>
                <p>Add the word you're learning in the 'Word' section</p>
                <p>Add its meaning in the 'Meaning' section</p>
                <p>add a 'Description' if needed</p>
                <p>you can click on the word after adding it to use the text-to-speech</p>
                <img className={"gif"} src={addWordGif} alt=""/>
                <Banner color={"blue"} text={"you can add up to 50 Words"}/>
            </details>
        </div>
    )
}