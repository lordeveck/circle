import React, { useState, createContext } from 'react'
import { TIME_LIMIT } from '../constants/common_constants';
import { getFromLocalStorage } from '../helpers/localStorage';

const GameFeatureContext = createContext();

export const GameFeatureProvider = ({ children }) => {
    const difficultyKey = getFromLocalStorage('difficulty') || 'normal';

    const [gameFeature, setGameFeature] = useState({
        difficulty: TIME_LIMIT[difficultyKey],
        gameType: null,
    });

    const toggleDifficulty = (difficultyKey) => {
        setGameFeature((prevGameFeature) => {
            return {
                ...prevGameFeature,
                difficulty: TIME_LIMIT[difficultyKey],
            };
        });
    }

    const toggleGameType = (gameType) => {
        setGameFeature((prevGameFeature) => {
            return {
                ...prevGameFeature,
                gameType,
            };
        });
    }

    const value = {
        gameFeature,
        toggleDifficulty,
        toggleGameType,
    }

    return <GameFeatureContext.Provider value={value}>{children}</GameFeatureContext.Provider>
}

export default GameFeatureContext;
