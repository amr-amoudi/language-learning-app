import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import DisplayStart from "../elements/displayStart.jsx";

export default function Start(){

    const [originalWords,setOriginalWords] = useState(JSON.parse(localStorage.getItem("wordsData")));
    const [questionWords,setQuestionWords] = useState([]);

    function getRandomWord(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getQuestionWord(arr) {

        let randomWord = getRandomWord(arr);

        while (questionWords.includes(randomWord)) {
            randomWord = getRandomWord(arr);
        }

        setQuestionWords(prev => [...prev, randomWord]);
    }


    useEffect(() => {
        if (originalWords.length > 0 && originalWords.length !== questionWords.length) {
            getQuestionWord(originalWords);
        }
    }, [originalWords, questionWords]);


    return (
        <div>
            <Link className="exit--button" to="/" >X</Link>
            {originalWords.length === questionWords.length && <DisplayStart questionWords={questionWords}/>}
        </div>
    )
}