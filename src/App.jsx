import {Link} from "react-router-dom";
import "./index.css"

export default function App(){

    if(!localStorage.getItem("wordsData")){
        localStorage.setItem("wordsData",JSON.stringify([]))
    }

    return(
        <div className="main--app">
            <nav>
                <Link to="words">Words</Link>
                <Link className="change" to="change">Change Language</Link>
                <Link to="help">Help?</Link>
            </nav>
            <button>START</button>
        </div>
    )
}