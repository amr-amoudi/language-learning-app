import {Link, useNavigate} from "react-router-dom";
import "./index.css"
import Banner from "./extra/banner.jsx";
import React from "react";

export default function App(){

    const navigate = useNavigate();
    const wordsArrLength = localStorage.getItem("wordsData");
    const lang = JSON.parse(localStorage.getItem("lang"))?.lang;
    let disable = false
    let displayError = false

    if(wordsArrLength){
        if(JSON.parse(wordsArrLength).length <= 3){
            disable = true
            displayError = true
        }

        if(JSON.parse(wordsArrLength).length === 0){
            disable = true
            displayError = false
        }
    }

    if(!localStorage.getItem("wordsData")){
        localStorage.setItem("wordsData",JSON.stringify([]))
    }

    return(
        <div className="main--app">
            <nav>
                <Link to="words">Words</Link>
                <Link className="change" to="change">{lang ? lang : "Change Language"}</Link>
                <Link to="help">Help?</Link>
            </nav>
            {displayError && <div className={"banner--words--alighn"}>
                <Banner color={"red"} text={"you need more words"} para={"you must have more than 3 words"}
                        maxDisplayWidth={"600px"}/>
            </div>}
            <button disabled={disable} onClick={() => navigate('/start')}>START</button>
        </div>
    )
}