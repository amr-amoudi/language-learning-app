import choselangGif from "../assets/ti-gof.gif"
import {Link} from "react-router-dom";
import worningImg from "../assets/Exclamation.png"
import "../index.css"

export default function SelectLangHelp({isOpen}){
    return (
        <div>
            <details open={isOpen}>
                <summary>selecting a language</summary>
                <div className={"details--help--content"}>
                    <p className={"big--paragraph"}>By choosing a language, you will enable the text-to-speech feature.</p>
                    <img className="gif" src={choselangGif} alt="a gif showing how to use the change language feature"/>
                    <h2>
                        <Link className={"help--links"} to={"/change"}>Click here</Link>to got to 'Change language'
                    </h2>
                    <div className="worning">
                        <img src={worningImg} alt="worning image"/>
                        <h1>If you can't hear any sound <Link className={"words--links--woring"} to={"/help/sound"}>Click here</Link></h1>
                    </div>
                </div>
            </details>
        </div>
);
}


