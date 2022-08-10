import DifficultyModal from "./difficultyModal/DifficultyModal";
import GameStatsModal from "./gameStatsModal/GameStatsModal";
import MainModal from "./main/MainModal";
import './Modal.css';

function Modal(props) {
    const modalComponent = {
        mainModal: () => {
            return <MainModal></MainModal>;
        },
        gameStats: () => {
            return <GameStatsModal gameStats={props.gameStats}></GameStatsModal>
        },
        settingsModal: () => {
            return <DifficultyModal></DifficultyModal>
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                {
                    modalComponent[props.modalType || 'mainModal']()
                }
            </div>
        </div>
    );
}

export default Modal;
