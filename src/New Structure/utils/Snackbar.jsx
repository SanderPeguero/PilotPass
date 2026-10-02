import React, { useState, useEffect } from 'react';

const SnackbarAlert = ({ severity, title, detail }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    if (!open) return null;

    let colors = '';
    let icon = '';

    if (severity === 1) { // success
        colors = 'bg-green-100 border-green-500 text-green-900';
        icon = '✅';
    } else if (severity === 2) { // info
        colors = 'bg-blue-100 border-blue-500 text-blue-900';
        icon = 'ℹ️';
    } else if (severity === 3) { // warning
        colors = 'bg-yellow-100 border-yellow-500 text-yellow-900';
        icon = '⚠️';
    } else { // error
        colors = 'bg-red-100 border-red-500 text-red-900';
        icon = '❌';
    }

    return (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
            <div className={`flex items-start p-4 border-l-4 rounded shadow-lg max-w-sm ${colors}`}>
                <div className="mr-3">
                    <span className="text-xl">{icon}</span>
                </div>
                <div>
                    <h3 className="font-bold text-sm">{title}</h3>
                    <div className="text-sm mt-1">{detail}</div>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 inline-flex h-8 w-8 hover:bg-black/10"
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SnackbarAlert;
