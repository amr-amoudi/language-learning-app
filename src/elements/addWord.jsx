import React, {useEffect, useState} from "react";


export default function AddWord({setAdd}){

    const [wordsArr,setWordsArr] = useState([]);
    const [form,setForm]= useState({
        word:"",
        meaning:"",
        disc:"",
        index: 0
    });

    useEffect(() => {
        const words = localStorage.getItem("wordsData");

        setWordsArr(JSON.parse(words))
        setForm(prev => {
            return {
                ...prev,
                index: JSON.parse(words).length + 1
            }
        })
    } , [])

    function submitForm(e){
        e.preventDefault();
    }

    function handleFormSubmit(e){
        const {name,value} = e.target;
        setForm(prev => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    function submit(){
        const oldWords = wordsArr

        if(oldWords){
            oldWords.unshift(form)
            localStorage.setItem("wordsData",JSON.stringify(oldWords))
        }else{
            localStorage.setItem("wordsData",JSON.stringify([form]))
        }


        setAdd(false)
    }


    return (
        <div className="add--word--display">
            <button onClick={() => setAdd(false)} className="close--btn">x</button>
            <form onSubmit={submitForm}>
                <div className="word--add add--word--submit--alighn">
                    <label htmlFor="word">Word</label>
                    <input
                        className="add--inputs"
                        required={true} id="word"
                        type="text"
                        placeholder="привет"
                        onChange={handleFormSubmit}
                        name="word"
                    />
                </div>
                <div className="meaning--add add--word--submit--alighn">
                    <label htmlFor="meaning">Meaning</label>
                    <input
                        className="add--inputs"
                        required={true}
                        id="meaning"
                        type="text"
                        placeholder="hello"
                        onChange={handleFormSubmit}
                        name="meaning"
                    />
                </div>
                <div className="disc--add add--word--submit--alighn">
                    <label htmlFor="disc">Description</label>
                    <textarea
                        className="add--inputs"
                        id="disc"
                        placeholder="saying hello to close people"
                        onChange={handleFormSubmit}
                        name="disc"
                    />
                </div>
            </form>
            <button
                disabled={!(form.word && form.meaning)}
                onClick={submit}
                className="form--add--word--submit"
            >Add!
            </button>
        </div>
    )
}