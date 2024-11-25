import {Link} from "react-router-dom";
import SelectLangHelp from "../elements/selectLangHelp.jsx";
import AddWordsHelp from "../elements/addWordsHelp.jsx";
import StartHelp from "../elements/startHelp.jsx";
import ExportHelp from "../elements/exportHelp.jsx";
import ImportHelp from "../elements/importHelp.jsx";

export default function Help(){
    return(
        <div>
            <Link to="/">to app</Link>

            <SelectLangHelp isOpen={!localStorage.getItem("lang")}/>
            <AddWordsHelp/>
            <StartHelp/>
            <ExportHelp/>
            <ImportHelp/>
        </div>
    )
}


