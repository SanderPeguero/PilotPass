import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  
    name: 'creator',
  
    initialState: {
        subject: null,
        response: null
    },

    reducers: {

        createSubject:(state, action) => {
            state.subject = action.payload
        },

        resetSubject: state => {
            state.subject = null
        },

        createResponse:(state, action) => {
            state.response = action.payload
        },

        resetResponse: state => {
            state.response = null
        }
    }
})

// Action creators are generated for each case reducer function
export const { createSubject, resetSubject, createResponse, resetResponse } = slice.actions

export default slice.reducer