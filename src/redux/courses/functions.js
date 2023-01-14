import axios from "../../axios/axios-quiz";
import { createError } from "../error/errorSlice";
import { fetchFailed, fetchQuizListSucceed, fetchQuizSucceed, fetchStart, quizFinished, quizNextQuestion, quizRetry, quizSetState, setResult, setResponse } from "./slice";
import store from "../store";
import { db } from '../../firebase/firebase'
import { ref, onValue } from 'firebase/database'
import { getAuth } from "firebase/auth";

export function fetchQuizList() {
    return async dispatch => {
        dispatch(fetchstart());

        try {
            
            const starCountRef = ref(db, 'quizList/');
            const auth = getAuth()
      
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                dispatch(fetchResponse(data))


            });

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
            const starCountRef = ref(db, `quizList/${quizId}`);

            const auth = getAuth()
            
            onValue(starCountRef, (snapshot) => {
                const quiz = snapshot.val();
                // console.log(quiz)
                dispatch(fetchResponse(quiz))
                dispatch(fetchquizSucceed(quiz.preguntas));
            });

            // const response = await axios.get(`quizList/${quizId}.json`);
            // const quiz = response.data.preguntas;
            // console.log(quiz)

        } catch (error) {

            dispatch(fetchfailed(error));

        }
    };
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {

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
                dispatch(setResult(answerState))
            } 
        }
        
        if(results[activeQuestionNumber] == "error"){
            dispatch(quizsetState({[answerId]: answerState}, {...results}));   
        }else{
            dispatch(quizsetState({[answerId]: answerState}, {...results, [activeQuestionNumber]: answerState}));
        }
        
        // control colors changing and final state
        if (isRightAnswerChosen) {
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

export function fetchResponse(quizList){
    return dispatch => {
        dispatch(setResponse({
            response: quizList
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