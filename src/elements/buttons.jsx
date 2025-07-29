export default function Buttons(props) {
    function getStyles() {
        let styles = {
            color:"#66FCF1",
            border: "2px solid #45A8A2",
            background:"#182028" ,
        };

        if (props.submitLength) {
            if (props.isRight === false) {
                styles = {
                    color:"#b82222"
                };
            } else if (props.isRight) {
                styles = {
                    color:"#00ff7f"
                };
            }
        } else {
            styles = {
                color: props.isHeld ? "#45A8A2" : "",
                border: props.isHeld ? "2px solid #45A8A2" : "",
                background: props.isHeld ? "#182028" : "",
            };
        }
        return styles;
    }

    return (
        <div onClick={props.handleClick} className="radio">
            <button className="test--button" style={getStyles()}>{props.text}</button>
        </div>
    );
}
