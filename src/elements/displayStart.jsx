import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./buttons.jsx";
import InfoBanner from "./infoBanner.jsx";
import {speakText} from "../testToSpeach.js";

export default function DisplayStart({ questionWords }) {
    const [AskedWords, setAskedWords] = useState([]);
    const [filteredArr, setFilteredArr] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [testWords, setTestWords] = useState([]);
    const [displayContinue, setDisplayContinue] = useState(false);
    const [onIsSelected, setOnIsSelected] = useState(false);
    const [isRight, setIsRight] = useState(null);
    const navigate = useNavigate();

    function getNewQuestionWord() {
        return questionWords.filter(
            word => !AskedWords.some(currentWord => currentWord.index === word.index)
        );
    }

    useEffect(() => {
        const newFilteredArr = getNewQuestionWord();
        setFilteredArr(newFilteredArr);

        if (newFilteredArr.length > 0 && !currentWord) {
            const initialWord = getRandom(newFilteredArr);
            setCurrentWord(initialWord);
            setAskedWords(prev => [...prev, initialWord]);
        }

        if (currentWord) {
            makeTestButtons(newFilteredArr);
        }
    }, [AskedWords, questionWords]);

    useEffect(() => {
        if (currentWord) {
            makeTestButtons(filteredArr, currentWord);
        }
    }, [filteredArr, currentWord, AskedWords]);

    useEffect(() => {
        if(currentWord){
            speakText(currentWord.word,JSON.parse(localStorage.getItem("lang")).code)
        }
    } ,[currentWord])

    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function reStruc(arr) {
        return arr.map((word) => {
            return { isHeld: false, isRight: null, ...word }
        });
    }

    function makeTestButtons(arr, currentWord) {
        let wordsTestArr = [];
        while (wordsTestArr.length < 3) {
            const randomWord = getRandom(arr);
            if (!wordsTestArr.includes(randomWord)) {
                wordsTestArr.push(randomWord);
            }
        }

        wordsTestArr.splice((wordsTestArr.length + 1) * Math.random() | 0, 0, currentWord);
        setTestWords(reStruc(wordsTestArr));
    }

    function getNewWord() {
        if (filteredArr.length <= 3) {
            setCurrentWord(null);
            return;
        }

        const randomWord = getRandom(filteredArr);
        if (randomWord) {
            setAskedWords(prevState => [...prevState, randomWord]);
            setCurrentWord(randomWord);
        } else {
            setCurrentWord(null);
        }

        setDisplayContinue(false);
    }

    function changeHeld(index) {
        if(!onIsSelected){
            setOnIsSelected(true)
        }

        setTestWords(prev =>
            prev.map(item =>
                item.index === index ? { ...item, isHeld: true } : {...item,isHeld: false}
            )
        );
    }

    function checkAnswer() {
        setDisplayContinue(true);
        setOnIsSelected(false)

        setTestWords(prev =>
            prev.map(item => {
                if (item.index === currentWord.index && item.isHeld) {
                    const isCorrect = currentWord.meaning === item.meaning;
                    setIsRight(isCorrect);
                    return { ...item, isRight: isCorrect };
                }

                if(!item.isHeld && currentWord.meaning === item.meaning){
                    return { ...item, isRight: true };
                }

                if (item.isHeld && item.index !== currentWord.index) {
                    setIsRight(false)
                    return { ...item, isRight: false };
                }

                return item;
            })
        );
    }

    return (
        <div>
            <h1 className="the--word" onClick={
                () => speakText(currentWord.word,JSON.parse(localStorage.getItem("lang")).code)
            }>{currentWord && currentWord.word}</h1>
            <div className="test--buttons--contanor">
                {testWords.map((testWord,index) => (
                    <Buttons
                        isRight={testWord.isRight}
                        key={index}
                        handleClick={() => changeHeld(testWord.index)}
                        isHeld={testWord.isHeld}
                        text={testWord.meaning}
                        submitLength={displayContinue}/>
                ))}
            </div>
            {currentWord &&  !displayContinue && (
                <button className={"next--button"} disabled={!onIsSelected} onClick={checkAnswer}>Check</button>
            )}
            {currentWord?.disc && <InfoBanner isRight={isRight} word={currentWord?.word} meaning={currentWord?.meaning} disc={currentWord?.disc}
                         timeToDisplay={displayContinue ? "display" : ""}/>}
            {displayContinue && filteredArr.length >= 4 && <button className={"next--button"} onClick={getNewWord}>Continue</button>}
            {displayContinue && filteredArr.length <= 3 && <button className={"next--button"} onClick={() => navigate("/")}>Back to app</button>}
        </div>
    );
}
