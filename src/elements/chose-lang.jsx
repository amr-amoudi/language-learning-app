import choselangGif from "../assets/ti-gof.gif"
import {Link} from "react-router-dom";
import worningImg from "../assets/Exclamation.png"

export default function ChoseLang(){
    return (
        <div>
            <details>
                <summary>You start by selecting a language!</summary>
                <p>By choosing a language, you will enable the text-to-speech feature.</p>
                <img className="gif" src={choselangGif} alt="a gif showing how to use the change language feature"/>
                <div className="worning">
                    <img src={worningImg} alt="worning image" />
                    <h1>If you can't hear any sound <Link to={"/help/sound"}>Click here</Link></h1>
                </div>
            </details>
        </div>
    );
}


