import startGif from "../assets/start-gif.gif"
import worningImg from "../assets/Exclamation.png";
import {Link} from "react-router-dom";


export default function StartHelp(){
    return(
        <div>
            <details>
                <summary>Start</summary>
                <h1>Start your test</h1>
                <img className={"gif"} src={startGif} alt=""/>
                <h2>you can click on the word to use the text-to-speech</h2>
                <div className="worning">
                    <img src={worningImg} alt="worning image"/>
                    <h1>If you can't hear any sound <Link to={"/help/sound"}>Click here</Link></h1>
                </div>
            </details>
        </div>
    )
}