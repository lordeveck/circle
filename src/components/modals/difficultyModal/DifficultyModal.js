import { useNavigate } from "react-router-dom";
import './DifficultyModal.css';
import { useContext, useEffect, useState } from "react";
import DifficultyContext from "../../../context/difficulty";
import { setToLocalStorage } from "../../../helpers/localStorage";

function DifficultyModal(props) {
    const navigate = useNavigate();
    const { difficulty: { key }, toggleDifficulty } = useContext(DifficultyContext);
    const [selectedDifficulty, setSelectedDifficulty] = useState(key);

    useEffect(() => {
        return () => {
            toggleDifficulty(selectedDifficulty);
            setToLocalStorage('difficulty', selectedDifficulty);
        }
    }, [selectedDifficulty, toggleDifficulty]);

    const onSelectedDifficultyChanged = (event) => {
        setSelectedDifficulty(event.target.value);
    }

    const navigateToHome = () => {
        navigate('/', {
            state: {
                to: 'mainModal',
            }
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-title">
                    <p>
                        <strong>Zorluk Seçimi</strong>
                    </p>
                    <hr></hr>
                </div>
                <div className="difficulty-checkbox-area">
                    <input
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={selectedDifficulty === 'easy'}
                        onChange={onSelectedDifficultyChanged} />
                    <label htmlFor="easy"> Kolay (10sn)</label><br></br>

                    <input
                        type="radio"
                        id="normal"
                        name="difficulty"
                        value="normal"
                        checked={selectedDifficulty === 'normal'}
                        onChange={onSelectedDifficultyChanged} />
                    <label htmlFor="normal"> Normal (7sn) </label><br></br>

                    <input
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={selectedDifficulty === 'hard'}
                        onChange={onSelectedDifficultyChanged} />
                    <label htmlFor="hard"> Zor (5sn)</label><br></br>
                </div>
                <div className="game-buttons">
                    <button id="new-game" className="game-button" onClick={navigateToHome}>Yeni Oyun</button>
                </div >
            </div>
        </div >
    );
}

export default DifficultyModal;
