import {Link} from "react-router-dom";
import ChoseLang from "../elements/chose-lang.jsx";

export default function Help(){
    return(
        <div>
            <h1>help here</h1>
            <Link to="/">to app</Link>


            <ChoseLang></ChoseLang>
        </div>
    )
}


