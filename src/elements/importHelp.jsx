import importHelp from "../assets/improt-help-gif.gif"
import Banner from "../extra/banner.jsx";
import worningImg from "../assets/Exclamation.png";
import {useNavigate} from "react-router-dom";

export default function ImportHelp(){

    const navigate = useNavigate();

    function handleClick(){
        localStorage.removeItem("wordsData")
        navigate("/")
    }

    return(
        <div>
            <details>
                <summary>Import Words</summary>
                <div className={"details--help--content"}>
                    <p className={"big--paragraph"}>go to the words section and click on the words button</p>
                    <p className={"big--paragraph"}>then paste the words data on the 'Words data input' and click on import</p>
                    <img className={"gif"} src={importHelp} alt=""/>
                    <Banner color={"red"} text={"corrupted data could crash the app"}/>
                    <div className="worning">
                        <img src={worningImg} alt="worning image"/>
                        <h1>if the app keeps crashing <button onClick={handleClick} className="app--crash--button">Click
                            here</button></h1>
                    </div>
                </div>
            </details>
        </div>
)
}