import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ExamProvider } from './contexts/ExamContext';
import { QuizProvider } from './contexts/QuizContext';
import { InteractionProvider } from './contexts/InteractionContext';

export const AppProviders = ({ children }) => {
    return (
        <InteractionProvider>
            <AuthProvider>
                <ExamProvider>
                    <QuizProvider>
                        {children}
                    </QuizProvider>
                </ExamProvider>
            </AuthProvider>
        </InteractionProvider>
    );
};
