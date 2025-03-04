import React, { createContext, useContext, useState } from 'react';

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {

    //Loading
    const [loading, setloading] = useState(false);

    //reducers
    const startLoading = () => setloading(true);
    const stopLoading = () => setloading(false);
    const fetchStart = () => setloading(true);
    const fetchStop = () => setloading(false);

    //Error
    const [error, seterror] = useState(null);

    const createError = seterror;
    const updateError = seterror;
    const deleteError = () => seterror(null);


    return (
        <InteractionContext.Provider value={{
            loading,
            startLoading,
            stopLoading,
            fetchStart,
            fetchStop,
            error,
            createError,
            updateError,
            deleteError
        }}>
            {children}
        </InteractionContext.Provider>
    );
};

export const useInteraction = () => {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error("useTest debe ser usado dentro de un TestProvider");
    }
    return context;
};
