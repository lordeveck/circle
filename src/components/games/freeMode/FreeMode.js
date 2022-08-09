import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "../../../helpers/localStorage";
import Games from '../Games';
import './FreeMode.css';

function FreeMode() {
    const navigate = useNavigate();

    const [gameStats, setGameStats] = useState({});
    const [highScores, setHighScores] = useState(0);

    const timeIsUp = () => {
        const { score } = gameStats;

        if (score >= highScores) {
            setToLocalStorage('freeMode', {
                highScore: score,
            });
        }

        navigate('/', {
            state: {
                gameStats: {
                    ...gameStats,
                    isCompleted: true,
                    showTimer: false,
                },
                from: 'freeMode',
                to: 'gameStats',
            }
        })
    };

    useEffect(() => {
        const { highScore = 0 } = getFromLocalStorage('freeMode') || {};
        setHighScores(highScore);
    }, []);

    useEffect(() => {
        setHighScores((prevHighScore) => {
            const { score } = gameStats;

            if (score > prevHighScore) {
                return score;
            }

            return prevHighScore;
        });
    }, [gameStats]);

    return (
        <Games gameMode={'freeMode'} onTimeIsUp={timeIsUp} onStatsChanged={(newGameStats) => setGameStats({ ...newGameStats })}>
            <div className="daily-letters">
                <p>En Yüksek Skor: {highScores}</p>
            </div>
        </Games>
    );
}

export default FreeMode;
