import { useEffect, useState } from 'react';
import wordList from '../../../constants/wordlist';
import Games from '../Games';
import './DailyMode.css';
import { useNavigate } from 'react-router-dom';
import { alphabet } from '../../../constants/common_constants';
import { getFromLocalStorage, setToLocalStorage } from '../../../helpers/localStorage';
import formatDate from '../../../helpers/formatDate';

function DailyMode() {
    const navigate = useNavigate();

    const [dailyWords, setDailyWords] = useState();
    const [gameStats, setGameStats] = useState({});
    const [selectedLetter, setSelectedLetter] = useState(null);

    const timeIsUp = (isCompleted = false) => {
        navigate('/', {
            state: {
                gameStats: {
                    ...gameStats,
                    isCompleted,
                    showTimer: false,
                },
                from: 'dailyMode',
                to: 'gameStats',
            }
        });
    };

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
                const matchedWordIndex = prevDailyWords?.indexOf(gameStats?.answers?.at(-1));
                const cloneDailyWords = [...prevDailyWords];

                if (matchedWordIndex >= 0) {
                    cloneDailyWords.splice(matchedWordIndex, 1);
                }

                if (cloneDailyWords?.length === 0) {
                    const { score } = gameStats;

                    setToLocalStorage('dailyMode', {
                        highScore: score,
                        isFinished: true,
                        date: formatDate(),
                        gameStats,
                    });

                    navigate('/', {
                        state: {
                            gameStats: {
                                ...gameStats,
                                isCompleted: true,
                                showTimer: true,
                            },
                            from: 'dailyMode',
                            to: 'gameStats',
                        }
                    });
                }

                return cloneDailyWords;
            });
        };

        checkDailyWords();
    }, [gameStats, navigate]);

    useEffect(() => {
        const { isFinished = false, date, gameStats } = getFromLocalStorage('dailyMode') || {};

        if (isFinished && date === formatDate()) {
            navigate('/', {
                state: {
                    gameStats: {
                        ...gameStats,
                        isCompleted: true,
                        showTimer: true,
                    },
                    from: 'dailyMode',
                    to: 'gameStats',
                }
            });
        }

    }, [navigate]);

    return (
        <Games gameMode={'dailyMode'} onTimeIsUp={timeIsUp} onStatsChanged={(newGameStats) => setGameStats({ ...newGameStats })} selectedLetter={selectedLetter}>
            <div className="daily-letters">
                <p>Bul: {dailyWords?.join(" - ")}</p>
            </div>
        </Games>
    );
}

export default DailyMode;
