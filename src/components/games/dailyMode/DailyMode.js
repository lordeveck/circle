import { useCallback, useContext, useEffect, useState } from 'react';
import wordList from '../../../constants/wordlist';
import Games from '../Games';
import './DailyMode.css';
import { alphabet } from '../../../constants/common_constants';
import { getFromLocalStorage, setToLocalStorage } from '../../../helpers/localStorage';
import formatDate from '../../../helpers/formatDate';
import GameFeatureContext from '../../../context/GameFeature';

function DailyMode(props) {
    const [dailyWords, setDailyWords] = useState();
    const [gameStatsFromComponent, setGameStatsFromComponent] = useState({});
    const [selectedLetter, setSelectedLetter] = useState(null);
    const {
        gameFeature: { difficulty: { name } },
    } = useContext(GameFeatureContext);

    const timeIsUp = useCallback(({ isCompleted, gameStats }) => {
        props.onGameCompleted({
            gameStats: {
                ...gameStats,
                isCompleted,
                showTimer: isCompleted,
                from: 'dailyMode',
                to: 'gameStatsModal',
                difficulty: name,
            },
        });
    }, [props, name]);

    useEffect(() => {
        const getDailyWords = () => {
            const initialDate = new Date('7/23/2022');
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - initialDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const selectedDailyWords = [
                wordList[diffDays].replaceAll('i', 'İ').toUpperCase(),
                wordList[diffDays + 1].replaceAll('i', 'İ').toUpperCase()
            ]

            const date = currentDate.getDate();
            const dailyLetter = alphabet[date <= 26 ? date : date - currentDate.getMonth()];

            setSelectedLetter(dailyLetter);
            setDailyWords([
                ...selectedDailyWords,
            ]);
        };

        getDailyWords();
    }, []);

    useEffect(() => {
        const checkDailyWords = () => {
            setDailyWords((prevDailyWords) => {
                const matchedWordIndex = prevDailyWords?.indexOf(gameStatsFromComponent?.answers?.at(-1));
                const cloneDailyWords = [...prevDailyWords];

                if (matchedWordIndex >= 0) {
                    cloneDailyWords.splice(matchedWordIndex, 1);
                }

                if (cloneDailyWords?.length === 0) {
                    const { score } = gameStatsFromComponent;

                    setToLocalStorage('dailyMode', {
                        highScore: score,
                        isFinished: true,
                        date: formatDate(),
                        gameStats: gameStatsFromComponent,
                    });

                    timeIsUp({
                        isCompleted: true,
                        gameStats: gameStatsFromComponent,
                    });
                }

                return cloneDailyWords;
            });
        };

        checkDailyWords();
    }, [gameStatsFromComponent, timeIsUp]);

    useEffect(() => {
        const { isFinished = false, date, gameStats } = getFromLocalStorage('dailyMode') || {};

        if (isFinished && date === formatDate()) {
            return timeIsUp({
                isCompleted: true,
                gameStats,
            });
        }

    }, [timeIsUp]);

    return (
        <Games gameMode={'dailyMode'} onTimeIsUp={timeIsUp} onStatsChanged={(newGameStats) => setGameStatsFromComponent({ ...newGameStats })} selectedLetter={selectedLetter}>
            <div className="daily-letters">
                <p>Bul: {dailyWords?.join(" - ")}</p>
            </div>
        </Games>
    );
}

export default DailyMode;
