import { useLocation } from "react-router-dom";
import GameStatsModal from "./gameStatsModal/GameStatsModal";
import MainModal from "./main/MainModal";
import './Modal.css';

function Modal() {
    const location = useLocation();

    return (
        <div className="modal-overlay">
            {
                location.state ?
                    <GameStatsModal locationState={location.state}></GameStatsModal> :
                    <MainModal></MainModal>
            }
        </div>
    );
}

export default Modal;
