import Banner from "../extra/banner.jsx";
import "../index.css"
import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {languageCodes} from "../langs.js"

export default function Lang(){

    const [newOption, setNewOption] = useState("")
    const [didChange, setDidChange] = useState(false)
    const storedLang = localStorage.getItem("lang") || "1";
    const navigate = useNavigate();

    const styles = {
        opacity : !didChange ? "0" : ""
    }

    function handelChange(e){
        const selectedValue = e.target.value;
        setNewOption(e.target.value)
        setDidChange(storedLang !== selectedValue);
    }

    function changeLang(){
        localStorage.setItem("lang", newOption)
        navigate("/")
    }

    const languges = languageCodes.map((lang) => {
        return <option key={lang.code} value={lang.code}>{lang.lang}</option>
    })

    return (
        <div className="change--lang">
            <Link to="/">Back To App</Link>
            <select className="change--lang--select" value={!didChange ? storedLang : newOption} onChange={handelChange} >
                {languges}
            </select>
            <Banner style={styles} color="yellow" text="worning" para="your words will be deleted"/>
            <button className="change--lang--button" onClick={changeLang} disabled={!didChange}>Change</button>
        </div>
    );
}