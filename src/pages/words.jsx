import {Link, useNavigate} from "react-router-dom";
import Banner from "../extra/banner.jsx";
import React, {useState,useEffect} from "react";
import Hover from "../elements/hover.jsx";
import AddWord from "../elements/addWord.jsx";

export default function Words(){

    const [words,setWords] = useState([]);
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();
    const lang = localStorage.getItem("lang");

    useEffect(()=>{
        const words = localStorage.getItem("wordsData");
        setWords(JSON.parse(words));
    }, [add])

    function deleteWord(index) {
        const updatedWords = words.filter((item) => item.index !== index)
        setWords(updatedWords);
        localStorage.setItem("wordsData", JSON.stringify(updatedWords))
    }

    const displayWords = words?.map((word, index)=>{
        return (
            <Hover key={index} handleClick={() => deleteWord(word.index)} word={word.word} dis={word.disc} meaning={word.meaning}/>
        )
    })

    function addWord(){
        setAdd(true);
    }

    return (
        <div className="words--main">
            {lang && <button onClick={addWord} className="add--word--btn">Add Word</button>}
            {!lang && <button className="add--word--btn" onClick={() => navigate("/change")}>chose language</button>}
            <div className={"banner--words--alighn"}>
                {!lang && <Banner color={"red"} text={"chose language"} para={"you must chose a language first"} maxDisplayWidth={"500px"}/>}
            </div>
            <div className="words--info">
                <Link to="/">Back To App</Link>
                <h1 style={{color:"#66fcf1"}}>Words:{words.length}</h1>
            </div>
            {words ? displayWords : <h1>there is no words</h1>}
            {add && <AddWord setAdd={setAdd}/>}
        </div>
    )
}