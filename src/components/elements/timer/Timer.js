import { useContext, useEffect, useState } from 'react';
import GameFeatureContext from '../../../context/GameFeature';
import './Timer.css';

function Timer(props) {
    const FULL_DASH_ARRAY = 283;
    const { gameFeature: { difficulty: { timeInSeconds } } } = useContext(GameFeatureContext);

    const [circleDasharray, setCircleDasharray] = useState("283");
    const [timeLeft, setTimeLeft] = useState(timeInSeconds);

    const { onTimeIsUp } = props

    useEffect(() => {
        clearInterval(window?.timerInterval);

        if (props.answerArray?.length) {
            setTimeLeft(timeInSeconds);

            window.timerInterval = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
        }
    }, [props.answerArray, timeInSeconds])

    useEffect(() => {
        const calculateTimeFraction = () => {
            const rawTimeFraction = timeLeft / timeInSeconds;
            return rawTimeFraction - (1 / timeInSeconds) * (1 - rawTimeFraction);
        }

        const setCircleDasharrayFunc = () => {
            const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;

            setCircleDasharray(circleDasharray);
        }

        if (timeLeft === 0) {
            return onTimeIsUp();
        }

        setCircleDasharrayFunc();
    }, [timeLeft, timeInSeconds, onTimeIsUp])

    return (
        <div className="base-timer">
            <svg
                className="base-timer__svg"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g className="base-timer__circle">
                    <circle
                        className="base-timer__path-elapsed"
                        cx="50"
                        cy="50"
                        r="45"
                    ></circle>
                    <path
                        id="base-timer-path-remaining"
                        style={{
                            "color": timeLeft === 3 ? "rgba(179, 48, 102)" : timeLeft === 2 ? "#590000" : ""
                        }}
                        strokeDasharray={circleDasharray}
                        className="base-timer__path-remaining arc"
                        d="
       M 50, 50
       m -45, 0
       a 45,45 0 1,0 90,0
       a 45,45 0 1,0 -90,0
       "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">{timeLeft}</span>
        </div >
    );
}

export default Timer;
