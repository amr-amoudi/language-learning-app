import addWordGif from "../assets/add-word-gif.gif"
import Banner from "../extra/banner.jsx";
import "../index.css"

export default function AddWordsHelp() {
    const isMobile = window.matchMedia("(max-width: 440px)").matches;

    return(
        <div>
            <details>
                <summary>Add Words</summary>
                <div className={"details--help--content"}>
                    <p>Add the word you're learning in the 'Word' section</p>
                    <p>Add its meaning in the 'Meaning' section</p>
                    <p>add a 'Description' if needed</p>
                    <p className={"big--font"}>you can click on the word after adding it to use the text-to-speech</p>
                    <img className={"gif"} src={addWordGif} alt=""/>
                    {isMobile && <Banner color={"blue"} text={"you can delete a word by double clicking on it"}/>}
                    <Banner color={"blue"} text={"you can add up to 50 Words"}/>
                </div>
            </details>
        </div>
)
}