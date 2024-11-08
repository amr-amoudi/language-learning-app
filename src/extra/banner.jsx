import PropTypes from "prop-types";
import "../index.css"
import checkImg from "../assets/Checkcircle.png"
import worningImg from "../assets/Exclamation.png"
import xcircle from "../assets/Xcircle.png"
import icon from "../assets/Icon.png"

export default function Banner({text, para, color, maxDisplayWidth = "1200px", style,...rest}){

    const colorImg = {
        green: checkImg,
        yellow: worningImg,
        red: xcircle,
        blue: icon
    }

    const bannerBackgroundColor = {
        green: "#ecfdf5",
        yellow:"#fffbeb",
        red:"#fef2f2",
        blue:"#EFF6FF"
    }

    const headerColor = {
        green: "#065f46",
        yellow:"#92400e",
        red:"#92400e",
        blue:"#1e40af"
    }

    const headerStyle = {
        color : headerColor[color],
        marginBottom: para ? "0" : "21px"
    }

    const paragraphColor = {
        green: "#047857",
        yellow: "#b45309",
        red: "#B45309",
        blue: "#1c51b9"
    }

    if(!color){
        throw new Error("you should pass a color [green , yellow, red, blue]")
    }

    return (
        <div {...rest} style={{backgroundColor: bannerBackgroundColor[color], maxWidth:maxDisplayWidth,...style}} className={"banner--main"}>
            <img src={colorImg[color]}/>
            <div className="banner--items">
                <h1 style={headerStyle}>{text}</h1>
                {para && <p style={{color:paragraphColor[color]}}>{para}</p>}
            </div>
        </div>
    )
}

Banner.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.oneOf(["green", "red", "blue","yellow"]).isRequired,
    para: PropTypes.string,
    maxDisplayWidth: PropTypes.string,
}