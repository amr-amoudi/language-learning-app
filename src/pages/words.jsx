import {Link, useNavigate} from "react-router-dom";
import Banner from "../extra/banner.jsx";
import React, {useState,useEffect} from "react";
import Hover from "../elements/hover.jsx";
import AddWord from "../elements/addWord.jsx";
import WordsButton from "../elements/wordsButton.jsx";

export default function Words(){

    const [words,setWords] = useState([]);
    const [dispayCopyWords,setDispayCopyWords] = useState(false);
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
        setDispayCopyWords(false);
    }

    function displayCopy(){
        setDispayCopyWords(true);
        setAdd(false)
    }

    function deleteAll(){
        setWords([])
        localStorage.setItem("wordsData", JSON.stringify([]));
    }

    return (
        <div className="words--main">
            <div className="words--info">
                {lang && <button
                    disabled={words.length === 50}
                    onClick={addWord}
                    className="add--word--btn">Add Word</button>}
                {lang && <button disabled={words.length === 0} onClick={deleteAll} className="add--word--btn">Delete All</button>}
            </div>
            {!lang && <button className="add--word--btn" onClick={() => navigate("/change")}>chose language</button>}
            <div className={"banner--words--alighn"}>
                {!lang && <Banner color={"red"} text={"chose language"} para={"you must chose a language first"} maxDisplayWidth={"500px"}/>}
            </div>
            <div className="words--info">
                <Link className={"words--link"} to="/">Back To App</Link>
                <button onClick={displayCopy} className="words--button" style={{color:"#66fcf1"}}>Words:{words.length}</button>
            </div>
            {words ? displayWords : <h1>there is no words</h1>}
            {add && <AddWord setAdd={setAdd}/>}
            {dispayCopyWords && <WordsButton setWords={setWords} setDispayCopy={setDispayCopyWords}/>}
        </div>
    )
}