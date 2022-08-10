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

    const [gameStats, setGameStats] = useState({
        answers: [],
        selectedIndexes: [],
        selectedLetters: [],
        score: 0,
    });

    useEffect(() => {
        const getRandomLetter = (answers) => {
            const selectedLetters = [];
            const selectedIndexes = [];
            const level = props.gameMode === 'freeMode' && answers.length > 14 ? 2 : 1;

            let lastAnswer = answers.at(-1)?.replaceAll('Ğ', 'G');
            lastAnswer = lastAnswer || props.selectedLetter || alphabet;

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

        const { selectedIndexes, selectedLetters } = getRandomLetter(gameStats.answers);

        setGameStats((prevGameStats) => {
            return {
                ...prevGameStats,
                selectedIndexes,
                selectedLetters,
            }
        });

    }, [gameStats.answers, props.gameMode, props.selectedLetter]);

    const submitAnswer = async (answer) => {
        const isAnswerCorrect = await setAnswersFunc(answer);

        if (!isAnswerCorrect) return;
    };

    const setAnswersFunc = async (answer) => {
        const upperCaseAnswer = answer.replaceAll('i', 'İ').toUpperCase();

        const isValid = isAnswerValid({
            answers: gameStats.answers,
            answer: upperCaseAnswer,
            selectedLetters: gameStats.selectedLetters,
        });

        if (!isValid) return false;

        if (props.onSubmitAnswer) {
            props.onSubmitAnswer(answer);
        } else {
            const isMeaningful = await isMeaningfulWord(answer);

            if (!isMeaningful) return false;
        }

        setGameStats((prevGameStats) => {
            const newGameStats = {
                ...prevGameStats,
                answers: [...prevGameStats.answers, upperCaseAnswer],
                score: prevGameStats.score + 1,
            };

            if (props.onStatsChanged) {
                props.onStatsChanged(newGameStats);
            }

            return newGameStats;
        });

        return true;
    };

    const timeIsUp = () => {
        props.onTimeIsUp({ isCompleted: false, gameStats });
    };

    return (
        <div ref={gameAreaRef} className="game-area" >
            <div id="game-stats">
                <Timer answerArray={gameStats.answers} onTimeIsUp={timeIsUp}></Timer>
                <Score selectedLetters={gameStats.selectedLetters} score={gameStats.score}>
                    {props.children}
                </Score>
            </div>

            <CorrectAnswers answerArray={gameStats.answers} selectedIndex={gameStats.selectedIndexes}></CorrectAnswers>

            <AnswerArea selectedLetters={gameStats.selectedLetters} onSubmitAnswer={submitAnswer} gameAreaRef={gameAreaRef} />
        </div >
    );
}

export default Games;
