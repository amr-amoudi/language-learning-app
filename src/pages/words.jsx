import {Link} from "react-router-dom";
import React, {useState,useEffect} from "react";
import Hover from "../elements/hover.jsx";
import AddWord from "../elements/addWord.jsx";

export default function Words(){

    const [words,setWords] = useState([]);
    const [add, setAdd] = useState(false);

    console.log(add)

    useEffect(()=>{
        const words = localStorage.getItem("wordsData");
        setWords(JSON.parse(words));
    }, [add])

    const displayWords = words?.map((word, index)=>{
        return (
            <Hover key={index} word={word.word} dis={word.disc} meaning={word.meaning}/>
        )
    })

    function addWord(){
        setAdd(true);
    }

    return (
        <>
            <Link to="/">Back To App</Link>
            <h1>Words:{words.length}</h1>
            <button onClick={addWord} className="add--word--btn">Add Word</button>
            {words ? displayWords : <h1>there is no words</h1>}
            {add && <AddWord setAdd={setAdd}/>}
        </>
    )
}