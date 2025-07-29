import React from "react";
import trash from "../assets/trash-can-solid.svg"
import {speakText} from "../testToSpeach.js";

export default function Hover({word,meaning,dis,handleClick}) {

    const [show, setShow] = React.useState(false);

    const isMobile = window.matchMedia("(max-width: 740px)").matches;


    const styles = {
        borderBottom: dis ? "#66FCF1 solid 0.188rem" : null
    }

    function handleHover() {
        setShow(true)
    }

    return (
        <div onDoubleClick={isMobile ? handleClick : undefined} className="element">
            <h1 className="words--hover--heading">{meaning}</h1>
            <img onClick={handleClick} className="trash" src={trash} alt="delete"/>
            <h1
                style={styles}
                className="word--mening words--hover--heading"
                onMouseEnter={() => handleHover()}
                onMouseLeave={() => setShow(false)}
                onClick={() => speakText(word, JSON.parse(localStorage.getItem("lang")).code)}
            >
                {show && dis && <p className="element--dis">{dis}</p>}
                {word}
            </h1>
        </div>
    )
}