import React, { createContext, useContext, useState } from 'react';

import { getAuth } from "firebase/auth"
import { ref, onValue } from "firebase/database"
import { db } from '../services/firebase'

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

    //Courses
    const [quizList, setquizList] = useState([]);
    const [isLoading, setisLoading] = useState(null);
    const [activeQuestionNumber, setactiveQuestionNumber] = useState(0);
    const [currentQuizQuestion, setcurrentQuizQuestion] = useState({});
    const [isQuizFinished, setisQuizFinished] = useState(false);
    const [answerState, setanswerState] = useState(null);
    const [results, setresults] = useState({});
    const [quiz, setquiz] = useState(null);
    const [response, setresponse] = useState(null);

    // Reducers
    const setResponse = setresponse;

    const fetchFailed = (data) => {
        setisLoading(false);
        createError(data);
    };

    const fetchQuizListSucceed = (data) => {
        setisLoading(false);
        setquizList(data);
    };

    const fetchQuizSucceed = (data) => {
        setisLoading(false);
        setquiz(data.quiz);
        setcurrentQuizQuestion(data.currentQuizQuestion);
    };

    const quizSetState = ({ answerState, results }) => {
        setanswerState(answerState);
        setresults(results);
    };

    const quizNextQuestion = ({ activeQuestionNumber, currentQuizQuestion }) => {
        setactiveQuestionNumber(activeQuestionNumber);
        setcurrentQuizQuestion(currentQuizQuestion);
        setanswerState(null);
    };

    const quizFinished = () => setisQuizFinished(true);

    const quizRetry = ({ currentQuizQuestion }) => {
        setcurrentQuizQuestion(currentQuizQuestion);
        setactiveQuestionNumber(0);
        setisQuizFinished(false);
        setanswerState(null);
        setresults({});
    };

    const setResults = (data) => setresults(data.answerState);

    //Functions
    function fetchQuizList() {
        try {
            const starCountRef = ref(db, 'quizList/');
            const auth = getAuth();

            onValue(starCountRef, (snapshot) => {
                fetchResponse(snapshot.val());
            });
        } catch (error) {
            createError(error);
            fetchfailed(error);
        }
    }

    function fetchQuizById(course, quizId) {
        try {
            const quiz = response[course]?.[quizId];
            if (quiz) {
                fetchquizSucceed(quiz.preguntas);
            } else {
                createError("Quiz not found");
            }
        } catch (error) {
            createError(error);
            fetchfailed(error);
        }
    }


    function quizAnswerClick(answerId) {
        try {
            // Prevent event handles twice (on each click)
            if (answerState && Object.values(answerState)[0] === "success") return;

            // Initialize variables
            const currentQuiz = quiz[activeQuestionNumber];
            const isRightAnswerChosen = currentQuiz.correctAnswer === answerId;
            const isFinalQuestion = activeQuestionNumber + 1 === quiz.length;

            // Set answer state and first chosen result
            const internalAnswerState = isRightAnswerChosen ? "success" : "error";

            if (results && !results[activeQuestionNumber]) {
                setResults(internalAnswerState);
            }

            const updatedResults = results[activeQuestionNumber] === "error"
                ? { [answerId]: internalAnswerState, ...results }
                : { ...results, [activeQuestionNumber]: internalAnswerState };

            quizsetState({ [answerId]: internalAnswerState }, updatedResults);

            // Control colors changing and final state
            if (isRightAnswerChosen) {
                const timeout = setTimeout(() => {
                    if (isFinalQuestion) {
                        finishquiz();
                    } else {
                        quiznextQuestion(activeQuestionNumber + 1, quiz[activeQuestionNumber + 1]);
                    }
                    clearTimeout(timeout);
                }, 500);
            }

        } catch (error) {
            createError(error);
        }
    }


    function fetchfailed(error) {
        fetchFailed(error);
    }

    function fetchResponse(quizList) {
        setResponse(quizList);
    }

    function fetchquizSucceed(quiz) {
        fetchQuizSucceed({
            quiz,
            currentQuizQuestion: quiz[0],
        });
    }

    function quizsetState(answerState, results) {
        quizSetState({ answerState, results });
    }

    function quiznextQuestion(nextQuestionNumber, nextQuizQuestion) {
        quizNextQuestion({
            activeQuestionNumber: nextQuestionNumber,
            currentQuizQuestion: nextQuizQuestion,
        });
    }

    function finishquiz() {
        quizFinished();
    }

    function retryQuiz() {
        if (quiz) resetquizState(quiz[0]);
    }

    function resetquizState(firstQuizQuestion) {
        quizRetry({ currentQuizQuestion: firstQuizQuestion });
    }


    return (
        <QuizContext.Provider value={{
            quizList,
            isLoading,
            activeQuestionNumber,
            currentQuizQuestion,
            isQuizFinished,
            answerState,
            results,
            quiz,
            response,
            fetchQuizList,
            fetchQuizById,
            quizAnswerClick,
            retryQuiz,
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useTest debe ser usado dentro de un TestProvider");
    }
    return context;
};
