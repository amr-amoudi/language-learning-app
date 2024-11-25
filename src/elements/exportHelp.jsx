import exportHelp from "../assets/export-gif.gif"
import Banner from "../extra/banner.jsx";


export default function ExportHelp(){
    return(
        <div>
            <details>
                <summary>share your words</summary>
                <p>go to the words section and click on the words button</p>
                <p>then click on export words</p>
                <img className={"gif"} src={exportHelp} alt=""/>
            </details>
        </div>
    )
}