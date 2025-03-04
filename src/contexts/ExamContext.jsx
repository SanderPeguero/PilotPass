import React, { createContext, useContext, useState } from 'react';

import { getAuth } from "firebase/auth"
import { ref, onValue } from "firebase/database"
import { db } from '../services/firebase'

import { useInteraction } from './InteractionContext';

const ExamContext = createContext();

const auth = getAuth()

export const ExamProvider = ({ children }) => {

    const { createError } = useInteraction()

    const [ExamResponse, setExamResponse] = useState(null);
    const [Exam, setExam] = useState(null);
    const [questions, setquestions] = useState([]);
    const [ExamIsLoading, setExamIsLoading] = useState(null);
    const [currentTestQuestion, setcurrentTestQuestion] = useState({});
    const [ExamAnswerState, setExamAnswerState] = useState(null);
    const [ExamActiveQuestionNumber, setExamActiveQuestionNumber] = useState(0);
    const [ExamResults, setExamResults] = useState({});
    const [isExamFinished, setisExamFinished] = useState(false);

    // Reducers
    const CreateExamResponse = setExamResponse;

    const fetchExamStart = () => setExamIsLoading(true);

    const fetchExamFailed = (data) => {
        setExamIsLoading(false);
        // seterror(data.error);
    };

    const createExam = setExam;

    const deleteExam = () => setExam(null);

    const createQuestion = setquestions;

    const fetchExamSucceed = (data) => {
        setExamIsLoading(false);
        setExam(data.exam);
        setcurrentTestQuestion(data.currentExamQuestion);
    };

    const ExamFinished = () => setisExamFinished(true);

    const ExamNextQuestion = (data) => {
        setExamActiveQuestionNumber(data.activeQuestionNumber);
        setcurrentTestQuestion(data.currentTestQuestion);
        setExamAnswerState(null);
    };

    const ExamSetState = ({ answerState, results }) => {
        setExamAnswerState(answerState);
        setExamResults(results);
    };

    const setResult = ({ answerState }) => setExamResults(answerState);

    const ExamRetry = ({ currentTestQuestion }) => {
        setcurrentTestQuestion(currentTestQuestion);
        setExamActiveQuestionNumber(0);
        setisExamFinished(false);
        setExamAnswerState(null);
        setExamResults({});
    };

    // Functions
    function getChoiceQuestions(num, params) {
        const questions = ExamResponse[params].preguntas;
        const selectedQuestions = [];

        for (let i = 0; i < num; i++) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            selectedQuestions.push(questions[randomIndex]);
        }

        return selectedQuestions;
    }

    function fetchExamById(examId) {
        try {
            const exam = store.getState().test.response[examId];
            fetchexamSucceed(exam.preguntas);
        } catch (error) {
            fetchExamFailed(error);
            createError(error.message);
        }
    }

    function fetchExams() {
        try {
            const starCountRef = ref(db, 'exams/');
            onValue(starCountRef, (snapshot) => {
                setExamResponse(snapshot.val());
            });
        } catch (error) {
            fetchExamFailed(error);
            createError(error.message);
        }
    }

    function fetchRandomExam(params) {
        try {
            const quiz = getChoiceQuestions(3, params);
            fetchexamSucceed(quiz);
        } catch (error) {
            createError(error.message);
        }
    }

    function fetchexamSucceed(exam) {
        fetchExamSucceed({
            exam,
            currentExamQuestion: exam[0],
        });
    }


    function ExamAnswerClick(answerId) {
        // Prevent handling the same click twice
        if (ExamAnswerState && Object.values(ExamAnswerState)[0] === "success") return;

        // Initialize variables
        const currentQuiz = Exam[ExamActiveQuestionNumber];
        const isRightAnswerChosen = currentQuiz.correctAnswer === answerId;
        const isFinalQuestion = ExamActiveQuestionNumber + 1 === Exam.length;

        // Set answer state and first chosen result
        const internalAnswerState = isRightAnswerChosen ? "success" : "error";

        // Update results if it's the first answer for the current question
        if (ExamResults && !ExamResults[ExamActiveQuestionNumber]) {
            setResult(internalAnswerState);
        }

        const updatedResults = ExamResults[ExamActiveQuestionNumber] === "error"
            ? { [answerId]: internalAnswerState, ...ExamResults }
            : { ...ExamResults, [ExamActiveQuestionNumber]: internalAnswerState };

        examsetState({ [answerId]: internalAnswerState }, updatedResults);

        // Control colors changing and move to next question
        if (isRightAnswerChosen) {
            setTimeout(() => {
                if (isFinalQuestion) {
                    ExamFinished();
                } else {
                    ExamnextQuestion(ExamActiveQuestionNumber + 1, Exam[ExamActiveQuestionNumber + 1]);
                }
            }, 500);
        }
    }

    function examsetState(answerState, results) {
        ExamSetState({ answerState, results });
    }

    const ExamnextQuestion = (nextQuestionNumber, nextQuizQuestion) => {
        ExamNextQuestion({
            activeQuestionNumber: nextQuestionNumber,
            currentTestQuestion: nextQuizQuestion
        });
    }

    function retryExam() {
        resetExamState(Exam[0]);
    }

    function resetExamState(firstQuizQuestion) {
        ExamRetry({ currentTestQuestion: firstQuizQuestion });
    }

    return (
        <ExamContext.Provider value={{
            Exam,
            ExamActiveQuestionNumber,
            currentTestQuestion,
            isExamFinished,
            ExamAnswerState,
            ExamIsLoading,
            ExamResponse,
            ExamResults,
            ExamAnswerClick,
            retryExam,
            resetExamState,
            fetchExams,
            fetchRandomExam,
        }}>
            {children}
        </ExamContext.Provider>
    );
};

export const useExam = () => {
    const context = useContext(ExamContext);
    if (!context) {
        throw new Error("useExam debe ser usado dentro de un ExamProvider");
    }
    return context;
};
