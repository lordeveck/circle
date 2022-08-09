import { useLocation } from "react-router-dom";
import DifficultyModal from "./difficultyModal/DifficultyModal";
import GameStatsModal from "./gameStatsModal/GameStatsModal";
import MainModal from "./main/MainModal";
import './Modal.css';

function Modal() {
    const location = useLocation();

    const locations = {
        gameStats: () => {
            return <GameStatsModal locationState={location.state}></GameStatsModal>
        },
        mainModal: () => {
            return <MainModal></MainModal>;
        },
        settingsModal: () => {
            return <DifficultyModal></DifficultyModal>
        }
    }

    return (
        <div className="modal-overlay">
            {
                locations[location?.state?.to || 'mainModal']()
            }
        </div>
    );
}

export default Modal;
