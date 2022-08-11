import { useCallback, useContext, useEffect, useState } from 'react';
import wordList from '../../../constants/wordlist';
import Games from '../Games';
import './DailyMode.css';
import { alphabet } from '../../../constants/common_constants';
import { getFromLocalStorage, setToLocalStorage } from '../../../helpers/localStorage';
import formatDate from '../../../helpers/formatDate';
import GameFeatureContext from '../../../context/GameFeature';

function DailyMode(props) {
    const [dailyLetters, setDailyLetters] = useState();
    const [gameStatsFromComponent, setGameStatsFromComponent] = useState({});
    const [selectedLetter, setSelectedLetter] = useState(null);
    const {
        gameFeature: { difficulty: { name } },
    } = useContext(GameFeatureContext);

    const timeIsUp = useCallback(({ isCompleted, gameStats = gameStatsFromComponent }) => {
        if (isCompleted) {
            setToLocalStorage('dailyMode', {
                highScore: gameStats.score,
                isFinished: true,
                date: formatDate(),
                gameStats: gameStats,
            });
        }

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
    }, [props, name, gameStatsFromComponent]);

    useEffect(() => {
        const getDailyLetters = () => {
            const initialDate = new Date('7/23/2022');
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - initialDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const selectedDailyWord = wordList[diffDays].replaceAll('i', 'İ').toUpperCase();

            const selectedDailyLetters = selectedDailyWord
                .split('')
                .map((letter) => {
                    return {
                        letter,
                        isFound: false,
                    };
                });

            const date = currentDate.getDate();
            const dailyLetter = alphabet[date <= 26 ? date : date - currentDate.getMonth()];

            setSelectedLetter(dailyLetter);
            setDailyLetters([
                ...selectedDailyLetters,
            ]);
        };

        getDailyLetters();
    }, []);

    useEffect(() => {
        const isCompleted = dailyLetters?.every((letterInfo) => letterInfo.isFound);

        if (!isCompleted) return;

        timeIsUp({
            isCompleted: true,
        });
    }, [dailyLetters, timeIsUp]);

    useEffect(() => {
        const checkDailyWords = () => {
            setDailyLetters((prevDailyLetters) => {
                const { selectedLetters } = gameStatsFromComponent || {};

                if (!selectedLetters) return prevDailyLetters;

                const matchedWordIndex = prevDailyLetters?.findIndex((letterInfo) => selectedLetters.includes(letterInfo.letter) && !letterInfo.isFound);

                prevDailyLetters[matchedWordIndex] = {
                    ...prevDailyLetters[matchedWordIndex],
                    isFound: true,
                }

                return [...prevDailyLetters];
            });
        };

        checkDailyWords();
    }, [gameStatsFromComponent]);

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
                <div className="word">
                    {
                        dailyLetters
                            ?.map((letterInfo, letterIndex) => {
                                if (letterInfo.isFound) {
                                    return <div className="square-selected" style={{ fontSize: '16px' }} key={letterIndex}>
                                        {letterInfo.letter}
                                    </div>
                                }

                                return <div className="square" style={{ fontSize: '20px' }} key={letterIndex}>
                                    {letterInfo.letter}
                                </div>
                            }
                            )
                    }
                </div>
            </div>
        </Games>
    );
}

export default DailyMode;
