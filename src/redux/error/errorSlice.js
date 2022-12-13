import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
  
    name: 'error',
  
    initialState: {
        error: null
    },

    reducers: {

        createError:(state, action) => {
            state.error = action.payload
        },

        updateError: (state, action) => {
            state.error = action.payload
        },

        deleteError: state => {
            state.error = null
        }

    }
})

// Action creators are generated for each case reducer function
export const { createError, deleteError } = errorSlice.actions

export default errorSlice.reducer