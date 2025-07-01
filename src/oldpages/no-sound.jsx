import {Link} from 'react-router-dom';


export default function NoSound(){
    return (
        <div>
            <Link className={"no--sound--help--link"} to={"/"}>X</Link>


            <div className={"no--sound--help"}>
                <h2>If you can't hear the text-to-speech, try changing your browser.</h2>
                <h1>OR</h1>
                <h2>Download the language pack on your device.</h2>
            </div>
        </div>
    )
}