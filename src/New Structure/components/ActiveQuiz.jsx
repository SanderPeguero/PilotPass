//dependencies
import React from "react";

//components
import AnswersList from "./AnswersList";

const ActiveQuiz = props => (
    <React.Fragment>
        <div className="bg-gray-800 border border-gray-700/60 rounded-2xl p-6 md:p-8 flex flex-col min-h-[500px] shadow-lg">
            {/* Header / Question Info */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Question {props.questionNumber} of {props.quizLength}
                </span>
            </div>

            {/* Image (if any) */}
            {props.image && (
                <div className="mb-6 flex justify-center">
                    <img
                        src={props.image}
                        alt={props.image}
                        className="rounded-xl border border-gray-700 max-h-64 object-contain"
                    />
                </div>
            )}

            {/* Question Text */}
            <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-100 leading-relaxed">
                    {props.question}
                </h2>
            </div>

            {/* Answers List */}
            <div className="flex-grow">
                <AnswersList
                    answers={props.answers}
                    onAnswerClick={props.onAnswerClick}
                    answerState={props.answerState}
                    questionId={props.questionNumber}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
                <button
                    onClick={props.onPrevClick}
                    disabled={props.questionNumber === 1}
                    className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Previous
                </button>

                {props.questionNumber < props.quizLength ? (
                    <button
                        onClick={props.onNextClick}
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors duration-200"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={props.onFinishClick}
                        className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors duration-200"
                    >
                        Finish
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    </React.Fragment>
);

export default ActiveQuiz;
