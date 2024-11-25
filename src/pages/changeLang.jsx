import Banner from "../extra/banner.jsx";
import "../index.css"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { languageCodes } from "../langs.js";

export default function Lang() {
    const [newOption, setNewOption] = useState({});
    const [didChange, setDidChange] = useState(false);
    const storedLang = JSON.parse(localStorage.getItem("lang")) || { code: "1", lang: "Default Language" };
    const navigate = useNavigate();
    const words = localStorage.getItem("wordsData");

    const styles = {
        opacity: !didChange ? "0" : ""
    };

    function handelChange(e) {
        const selectedValue = JSON.parse(e.target.value);
        setNewOption(selectedValue);
        setDidChange(storedLang.code !== selectedValue.code);
    }

    function changeLang() {
        localStorage.setItem("lang", JSON.stringify(newOption));
        localStorage.removeItem("wordsData")
        navigate("/");
    }

    const languges = languageCodes.map((lang) => {
        return <option key={lang.code} value={JSON.stringify(lang)}>{lang.lang}</option>;
    });

    return (
        <div className="change--lang">
            <Link to="/">Back To App</Link>
            <select
                className="change--lang--select"
                value={JSON.stringify(!didChange ? storedLang : newOption)}
                onChange={handelChange}
            >
                {languges}
            </select>
            {words && <Banner maxDisplayWidth="500px" style={styles} color="yellow" text="Warning" para="Your words will be deleted"/>}
            <button className="change--lang--button" onClick={changeLang} disabled={!didChange}>Change</button>
        </div>
    );
}
