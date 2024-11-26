import startGif from "../assets/start-gif.gif"
import worningImg from "../assets/Exclamation.png";
import {Link} from "react-router-dom";
import "../index.css"


export default function StartHelp(){
    return(
        <div>
            <details>
                <summary>Start</summary>
                <div className={"details--help--content"}>
                    <h1 className={"small--font"}>Start your test</h1>
                    <img className={"gif"} src={startGif} alt=""/>
                    <h2>you can click on the word to use the text-to-speech</h2>
                    <div className="worning">
                        <img src={worningImg} alt="worning image"/>
                        <h1>If you can't hear any sound <Link to={"/help/sound"}>Click here</Link></h1>
                    </div>
                </div>
            </details>
        </div>
)
}