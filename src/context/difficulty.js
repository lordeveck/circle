import React, { useState, createContext } from 'react'
import { TIME_LIMIT } from '../constants/common_constants';
import { getFromLocalStorage } from '../helpers/localStorage';

const DifficultyContext = createContext();

export const DifficultyProvider = ({ children }) => {
    const difficultyKey = getFromLocalStorage('difficulty') || 'normal';

    const [difficulty, setDifficulty] = useState(TIME_LIMIT[difficultyKey]);

    const toggleDifficulty = (difficulty) => {
        setDifficulty(TIME_LIMIT[difficulty]);
    }

    const value = {
        difficulty,
        toggleDifficulty
    }

    return <DifficultyContext.Provider value={value}>{children}</DifficultyContext.Provider>
}

export default DifficultyContext;
