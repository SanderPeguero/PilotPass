import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isExamSimulation, setIsExamSimulation] = useState(() => {
        const saved = localStorage.getItem('isExamSimulation');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isExamSimulation', isExamSimulation.toString());
    }, [isExamSimulation]);

    return (
        <SettingsContext.Provider value={{
            isExamSimulation,
            setIsExamSimulation
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
