import './DifficultyModal.css';
import { useContext } from "react";
import { setToLocalStorage } from "../../../helpers/localStorage";
import GameFeatureContext from "../../../context/GameFeature";

function DifficultyModal() {
    const {
        gameFeature: { difficulty: { key } },
        toggleDifficulty,
        toggleGameType
    } = useContext(GameFeatureContext);

    const onSelectedDifficultyChanged = (event) => {
        toggleDifficulty(event.target.value);
    }

    const openMainMenu = () => {
        setToLocalStorage('difficulty', key);
        toggleGameType(null);
    };

    return (
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
                    checked={key === 'easy'}
                    onChange={onSelectedDifficultyChanged} />
                <label htmlFor="easy"> Kolay (10sn)</label><br></br>

                <input
                    type="radio"
                    id="normal"
                    name="difficulty"
                    value="normal"
                    checked={key === 'normal'}
                    onChange={onSelectedDifficultyChanged} />
                <label htmlFor="normal"> Normal (7sn) </label><br></br>

                <input
                    type="radio"
                    id="hard"
                    name="difficulty"
                    value="hard"
                    checked={key === 'hard'}
                    onChange={onSelectedDifficultyChanged} />
                <label htmlFor="hard"> Zor (5sn)</label><br></br>
            </div>
            <div className="game-buttons">
                <button id="new-game" className="game-button" onClick={openMainMenu}>Yeni Oyun</button>
            </div >
        </div>

    );
}

export default DifficultyModal;
