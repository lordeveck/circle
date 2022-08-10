import { useContext, useState } from 'react';
import GameFeatureContext from '../../context/GameFeature';
import DailyMode from '../games/dailyMode/DailyMode';
import FreeMode from '../games/freeMode/FreeMode';
import Modal from '../modals/Modal';
import Header from './Header';
import './Main.css';

function Main() {
    const { gameFeature: { gameType }, toggleGameType } = useContext(GameFeatureContext);

    const [gameStats, setGameStats] = useState(null);

    const gameComplete = ({ gameStats }) => {
        const { to } = gameStats;

        setGameStats(gameStats);
        toggleGameType(to);
    };

    const openModal = (modalType) => {
        toggleGameType(modalType);
    };


    const mainComponents = {
        mainModal: () => {
            return <Modal />;
        },
        settingsModal: () => {
            return <Modal modalType='settingsModal' />;
        },
        gameStatsModal: () => {
            return <Modal modalType='gameStats' gameStats={gameStats} />;
        },
        freeMode: () => {
            return <FreeMode onGameCompleted={gameComplete} />;
        },
        dailyMode: () => {
            return <DailyMode onGameCompleted={gameComplete} />;
        }
    }

    return (
        <div className="main">
            <Header onModalOpened={openModal} />
            {mainComponents[gameType || 'mainModal']()}
        </div>
    );
}

export default Main;