import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  
    name: 'courses',
  
    initialState: {
        quizList: [],
        isLoading: null,
        error: null,
        activeQuestionNumber: 0,
        currentQuizQuestion: {},
        isQuizFinished: false,
        answerState: null,
        results: {},
        quiz: null
    },

    reducers: {

        fetchStart: state => {
            state.isLoading = true
        },

        fetchFailed: (state, action) => {
            state.isLoading = false,
            state.error = action.payload.error
        },

        fetchQuizListSucceed: (state, action) => {
            state.isLoading = false,
            state.quizList = action.payload.quizList
        },

        fetchQuizSucceed: (state, action) => {
            state.isLoading = false,
            state.quiz = action.quiz,
            state.currentQuizQuestion = action.payload.currentQuizQuestion
        },

        quizSetState: (state, action) => {
            state.answerState = action.payload.answerState,
            state.results = action.payload.results
        },

        quizNextQuestion: (state, action) => {
            state.activeQuestionNumber = action.payload.activeQuestionNumber,
            state.currentQuizQuestion = action.payload.currentQuizQuestion,
            state.answerState = null
        },

        quizFinished: (state, action) => {
            state.isQuizFinished = true
        },

        quizRetry: (state,action) => {
            state.currentQuizQuestion = action.payload.currentQuizQuestion,
            state.activeQuestionNumber = 0,
            state.isQuizFinished = false,
            state.answerState = null,
            state.results = {}

        }
    }
})

// Action creators are generated for each case reducer function
export const { fetchStart, fetchFailed, fetchQuizListSucceed, fetchQuizSucceed, quizSetState, quizNextQuestion, quizFinished, quizRetry } = slice.actions

export default slice.reducer