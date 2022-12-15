import { display } from "@mui/system";
import axios from "../../axios/axios-quiz";
import { createError } from "../error/errorSlice";
import { fetchFailed, fetchQuizListSucceed, fetchQuizSucceed, fetchStart, quizFinished, quizNextQuestion, quizRetry, quizSetState, setResult } from "./slice";
import store from "../store";

export function fetchQuizList() {
    return async dispatch => {
        dispatch(fetchstart());

        try {
            const response = await axios.get("quizList.json");
            const quizList = [];

            // console.log(response)
            let data = response.data

            Object.keys(data).map((question, index, value) => {
                quizList.push({
                    id: question,
                    name: data[question].subject
                })
            })

            dispatch(fetchquizListSucceed(quizList))
            

        } catch (error) {
            dispatch(createError(error))
            dispatch(fetchfailed(error));
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {

        dispatch(fetchstart());

        try {
            const response = await axios.get(`quizList/${quizId}.json`);
            const quiz = response.data.preguntas;

            dispatch(fetchquizSucceed(quiz));

        } catch (error) {

            dispatch(fetchfailed(error));

        }
    };
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        // const state = getState().currentQuiz;
        const state = store.getState().courses;
        

        // prevent event handles twice (on each click)
        let currentState = state.answerState;
        if (currentState) {
            const key = Object.keys(currentState)[0];
            if (currentState[key] === "success") return;
        }

        // initialize variables
        let activeQuestionNumber = state.activeQuestionNumber;
        let currentQuiz = state.quiz[activeQuestionNumber];
        let isRightAnswerChosen = currentQuiz.correctAnswer === answerId;
        let isFinalQuestion = activeQuestionNumber + 1 === state.quiz.length;

        // set answer state and first chosen result
        let answerState = isRightAnswerChosen ? "success" : "error";
        let results = state.results;
        if(results){
            if (!results[activeQuestionNumber]){
                // results[activeQuestionNumber] = answerState;
                dispatch(setResult(answerState))
            } 
        }
        
        // dispatch(quizsetState({[answerId]: answerState}, results));
        if(results[activeQuestionNumber] == "error"){
            dispatch(quizsetState({[answerId]: answerState}, {...results}));   
        }else{
            dispatch(quizsetState({[answerId]: answerState}, {...results, [activeQuestionNumber]: answerState}));
        }
        
        // control colors changing and final state
        if (isRightAnswerChosen) {
            // dispatch(quizsetState({[answerId]: answerState}, {...results, [activeQuestionNumber]: answerState}));
            const timeout = window.setTimeout(() => {
                if (isFinalQuestion)
                dispatch(finishquiz());
                else {
                    let nextQuestionNumber = activeQuestionNumber + 1;
                    dispatch(quiznextQuestion(nextQuestionNumber, state.quiz[nextQuestionNumber]));
                }
                
                window.clearTimeout(timeout);
            }, 500);
        }

    }
}

export function fetchstart() {
    return dispatch => {
        dispatch(fetchStart())
    }
}

export function fetchfailed(error) {
    return dispatch => {
        dispatch(fetchFailed({
            error: error
        }))
    }
}

export function fetchquizListSucceed(quizList) {
    return dispatch => {
        dispatch(fetchQuizListSucceed({
            quizList: quizList
        }))
    }
}

export function fetchquizSucceed(quiz) {
    return dispatch => {
        dispatch(fetchQuizSucceed({
            quiz: quiz,
            currentQuizQuestion: quiz[0]
        }))
    }
}

export function quizsetState(answerState, results) {
    return dispatch => {
        dispatch(quizSetState({
            answerState: answerState,
            results: results
        }))
    }
}

export function quiznextQuestion(nextQuestionNumber, nextQuizQuestion) {
    return dispatch => {
        dispatch(quizNextQuestion({
            activeQuestionNumber: nextQuestionNumber,
            currentQuizQuestion: nextQuizQuestion
        }))
    }
}

export function finishquiz() {
    return dispatch => {
        dispatch(quizFinished())
    }
}

export function retryQuiz() {
    return dispatch => {
        const state = store.getState().courses;
        dispatch(resetquizState(state.quiz[0]));
    }
}

export function resetquizState(firstQuizQuestion) {
    return dispatch => {
        dispatch(quizRetry({
            currentQuizQuestion: firstQuizQuestion
        }))
    }
}