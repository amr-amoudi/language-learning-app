


export default function InfoBanner({timeToDisplay,word,meaning,disc,isRight}){


    return (
        <div className={`info--banner--main ${isRight ? "is--right" : "is--wrong"} ${timeToDisplay}`}>
            <h2>word: {word}</h2>
            <p>meaning: {meaning}</p>
            {disc && <p className="test--word--dic">description: {disc}</p>}
        </div>
    )
}