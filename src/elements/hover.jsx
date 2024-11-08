import React from "react";
import trash from "../assets/trash-can-solid.svg"

export default function Hover({word,meaning,dis}){

    const [show,setShow] = React.useState(false);

    const styles = {
        borderBottom: dis ? "#66FCF1 solid 0.188rem" : null
    }

    return (
        <div className="element">
            <h1>{meaning}</h1>
            <img className="trash" src={trash} alt="delete"/>
            <h1
                style={styles}
                className="word--mening"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {show && dis && <p className="element--dis">{dis}</p>}
                {word}
            </h1>
        </div>
    )
}