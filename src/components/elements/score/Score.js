import './Score.css';

function Score(props) {
    return (
        <div id="score" className="score">
            <p>Skor: {props.score}</p>

            {props.children}

            <div id="selected-letter">
                <p>Harf: {props.selectedLetters?.join("-") || '?'
                }</p>
            </div>
        </div>
    );
}

export default Score;
