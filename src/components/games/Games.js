import AnswerArea from '../elements/answerArea/AnswerArea.js';
import CorrectAnswers from '../elements/correctAnswers/CorrectAnswers.js';
import Score from '../elements/score/Score.js';
import Timer from '../elements/timer/Timer.js';
import './Games.css';
import { alphabet } from '../../constants/common_constants.js';
import { useEffect, useRef, useState } from 'react';
import isAnswerValid from "../../helpers/isAnswerValid.js";
import { isMeaningfulWord } from "../../services/http-requests.js";

function Games(props) {
    const gameAreaRef = useRef(null);

    const [answers, setAnswers] = useState([]);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [score, setScore] = useState(0);
    const [gameAreaHeight, setGameAreaHeight] = useState();
    const [initialGameArea, setInitialGameArea] = useState();
    const [initialWindowHeight, setinitialWindowHeight] = useState();

    useEffect(() => {
        setInitialGameArea(gameAreaRef?.current?.offsetHeight);
        setinitialWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        const getRandomLetter = (answers) => {
            const selectedLetters = [];
            const selectedIndexes = [];
            const level = props.gameMode === 'freeMode' && answers.length > 14 ? 2 : 1;

            let lastAnswer = answers.at(-1);
            lastAnswer = lastAnswer || alphabet;

            for (let i = 1; i < level + 1; i++) {
                const randomIndex = Math.floor(Math.random() * lastAnswer.length);
                const randomLetter = lastAnswer[randomIndex];

                selectedLetters.push(randomLetter);
                selectedIndexes.push(randomIndex)
            }

            return {
                selectedIndexes,
                selectedLetters,
            };
        };

        const { selectedIndexes, selectedLetters } = getRandomLetter(answers);

        setSelectedIndexes(selectedIndexes);
        setSelectedLetters(selectedLetters);

    }, [answers, props.gameMode]);

    const submitAnswer = async (answer) => {
        const isAnswerCorrect = await setAnswersFunc(answer);

        if (!isAnswerCorrect) return;

        setScore((prevScore) => prevScore + 1);
    };

    const setAnswersFunc = async (answer) => {
        const upperCaseAnswer = answer.replaceAll('i', 'İ').toUpperCase();

        const isValid = isAnswerValid({ answers, answer: upperCaseAnswer, selectedLetters });

        if (!isValid) return false;

        const isMeaningful = await isMeaningfulWord(answer);

        if (!isMeaningful) return false;

        setAnswers([...answers, upperCaseAnswer.replaceAll('Ğ', 'G')]);
        props.onAnswerChanged(upperCaseAnswer);

        return true;
    };

    const timeIsUp = () => {
        props.onTimeIsUp();
    };

    const keyboardFocus = () => {
        setTimeout(() => {
            const keyboardOpenHeight = initialWindowHeight - window.innerHeight;

            setGameAreaHeight(`calc(${initialGameArea}px - ${keyboardOpenHeight}px)`)

            window.scrollTo({
                top: 0,
            });
        }, 200);
    };

    const keyBoardBlur = () => {
        setTimeout(() => {
            setGameAreaHeight(`100%`)

            window.scrollTo({
                top: 0,
            });
        }, 200);
    };

    return (
        <div ref={gameAreaRef} className="game-area" style={{
            "height": gameAreaHeight ? gameAreaHeight : '100%'
        }}>
            <div id="game-stats">
                <Timer answerArray={answers} onTimeIsUp={timeIsUp}></Timer>
                <Score selectedLetters={selectedLetters} score={score}>
                    {props.children}
                </Score>
            </div>

            <CorrectAnswers answerArray={answers} selectedIndex={selectedIndexes}></CorrectAnswers>

            <AnswerArea selectedLetters={selectedLetters} onSubmitAnswer={submitAnswer} onKeyboardFocus={keyboardFocus} onKeyBoardBlur={keyBoardBlur} />
        </div >
    );
}

export default Games;
