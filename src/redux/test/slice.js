import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",

  initialState: {
    test: null,
    questions: [],
    isLoading: null,
    currentTestQuestion: {},
    answerState: null,
    activeQuestionNumber: 0,
    results: {},
    isTestFinished: false,
  },

  reducers: {
    
    fetchStartTest: state => {
      state.isLoading = true
    },
    createTest: (state, action) => {
      state.test = action.payload;
    },

    deleteTest: (state) => {
      state.test = null;
    },

    createQuestions: (state, action) => {
      state.questions = action.payload;
    },

    fetchTestSucceed: (state, action) => {
      state.isLoading = false,
      state.test = action.payload.test,
      state.currentTestQuestion = action.payload.currentTestQuestion
    },
    testFinished: (state) => {
      state.isTestFinished = true
    },

    testNextQuestion: (state, action) => {
      state.activeQuestionNumber = action.payload.activeQuestionNumber,
      state.currentTestQuestion = action.payload.currentTestQuestion,
      state.answerState = null
    },

    testSetState: (state, action) => {
      state.answerState = action.payload.answerState,
      state.results = action.payload.results
    },

    setResult: (state, action) => {
      state.results = action.payload.answerState
    },

    testRetry: (state,action) => {
      state.currentTestQuestion = action.payload.currentTestQuestion,
      state.activeQuestionNumber = 0,
      state.isQuizFinished = false,
      state.answerState = null,
      state.results = {}

    }
    
  },
});

// Action creators are generated for each case reducer function
export const {fetchStartTest, createTest, deleteTest, createQuestions, fetchTestSucceed, testFinished, testNextQuestion, testSetState, setResult, testRetry} = testSlice.actions;

export default testSlice.reducer;
