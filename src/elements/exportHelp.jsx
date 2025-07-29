import exportHelp from "../assets/export-gif.gif"
import "../index.css"

export default function ExportHelp(){
    return(
        <div>
            <details>
                <summary>share your words</summary>
                <div className={"details--help--content"}>
                    <p style={{marginTop:"20px"}} className={"big--font"}>go to the words section and click on the words button</p>
                    <p className={"big--font"}>then click on export words</p>
                    <img className={"gif"} src={exportHelp} alt=""/>
                </div>
            </details>
        </div>
    )
}