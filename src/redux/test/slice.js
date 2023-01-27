import { createSlice } from '@reduxjs/toolkit'

export const testSlice = createSlice({
  
    name: 'test',
  
    initialState: {
        test: null,
        questions: []
    },

    reducers: {

        createTest:(state, action) => {
            state.test = action.payload
        },

        deleteTest: state => {
            state.test = null
        },

        createQuestions: (state, action) => {
            state.questions = action.payload
        }

    }
})

// Action creators are generated for each case reducer function
export const { createTest, deleteTest, createQuestions } = testSlice.actions

export default testSlice.reducer