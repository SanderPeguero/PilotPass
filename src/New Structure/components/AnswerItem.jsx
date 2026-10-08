import React from "react";

const AnswerItem = props => {
    let stateStyles = "bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-blue-500/50";
    
    if (props.answerState === "success") {
        stateStyles = "bg-emerald-900/30 border-emerald-500 text-emerald-400";
    } else if (props.answerState === "error") {
        stateStyles = "bg-red-900/30 border-red-500 text-red-400";
    }

    return (
        <li
            className={`w-full text-left p-4 rounded-xl border cursor-pointer transition-all duration-200 ${stateStyles}`}
            onClick={() => props.onAnswerClick(props.id)}
        >
            <div className="flex items-center w-full">
                <div className="flex-1 font-medium">
                    {props.answer}
                </div>
                {props.answerState === "success" && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                )}
                {props.answerState === "error" && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
        </li>
    );
};

export default AnswerItem;
