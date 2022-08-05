import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import wordList from '../../../constants/wordlist';
import Games from '../Games';
import './DailyMode.css';

function DailyMode() {
    const navigate = useNavigate();

    const [dailyWords, setDailyWords] = useState();

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

            setDailyWords([
                ...selectedDailyWords,
            ]);
        };

        getDailyWords();
    }, []);

    useEffect(() => {
        if (dailyWords?.length === 0) {
            navigate('/');
        }
    }, [dailyWords, navigate]);

    const answerChanged = (answer) => {
        const matchedWordIndex = dailyWords.indexOf(answer);
        if (matchedWordIndex >= 0) {
            const cloneDailyWords = [...dailyWords];
            cloneDailyWords.splice(matchedWordIndex, 1);
            setDailyWords(cloneDailyWords);
        }
    };

    const timeIsUp = () => {
        navigate('/');
    };

    return (
        <Games gameMode={'dailyMode'} onAnswerChanged={answerChanged} onTimeIsUp={timeIsUp}>
            <div className="daily-letters">
                <p>Bul: {dailyWords?.join(" - ")}</p>
            </div>
        </Games>
    );
}

export default DailyMode;
