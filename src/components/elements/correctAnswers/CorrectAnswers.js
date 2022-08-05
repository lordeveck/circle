import { useEffect, useState } from 'react';
import './CorrectAnswers.css';

function CorrectAnswers(props) {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setAnswers(props.answerArray.slice(-3));
    }, [props.answerArray])

    return (
        <div className="correct-answers">
            {
                answers.slice(-3).map((answer, index) => {
                    return (
                        <div className="word" key={index}>
                            {
                                answer
                                    .split("")
                                    .map((letter, letterIndex) => {
                                        if (index === answers.length - 1 && props.selectedIndex.includes(letterIndex)) {
                                            return <div className="square-selected" key={letterIndex}>
                                                {letter}
                                                {props.selectedIndex[0] === props.selectedIndex[1] ? <span className="square-multiple">2</span> : ''}
                                            </div>
                                        }
                                        return <div className="square" key={letterIndex}>
                                            {letter}
                                        </div>
                                    }
                                    )
                            }
                        </div>
                    )
                })}
        </div >
    );
}

export default CorrectAnswers;
