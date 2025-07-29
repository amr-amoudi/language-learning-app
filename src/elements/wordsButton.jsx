import {useState} from "react";
import Banner from "../extra/banner.jsx";
import "../index.css"


export default function WordsButton({setDispayCopy,setWords}){

    const wordsData = localStorage.getItem("wordsData");
    const [wordsDataInput, setWordsDataInput] = useState({
        wordsData:""
    });
    const [displayError, setDisplayError] = useState(false);

    function exportWords(){
        navigator.clipboard.writeText(wordsData);
        setDispayCopy(false)
    }

    function handleChange(e){
        const {name,value} = e.target;
        setWordsDataInput(prev => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    function importWords(){
        try{
            setWords(JSON.parse(wordsDataInput.wordsData));
            localStorage.setItem("wordsData", wordsDataInput.wordsData);
            setDispayCopy(false)
        }catch (e){
            setDisplayError(true)
        }
    }


    return(
        <div className="add--word--display words--button--container">
            <button onClick={() => setDispayCopy(false)} className="close--btn">x</button>
            <div className="words--button--main">

                <button onClick={exportWords} className={"words--button--ex--imp"}>Export words</button>
                <hr/>
                <div className="words--button--main--import--sec">

                    <input name="wordsData" onChange={handleChange} className={"add--inputs"} placeholder={"Words Data Here"} type="text"/>

                    <button onClick={importWords} className={"words--button--ex--imp"}>Import words</button>

                    {displayError && <Banner styles={{alignSelf:"center",width:"100%"}} color={"red"} text={"data is not valid"}/>}
                </div>
            </div>
        </div>
    )
}