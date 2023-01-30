import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  
    name: 'loading',
  
    initialState: {
        loading: false
    },

    reducers: {

        fetchStart:(state) => {
            state.loading = true
        },

        fetchStop: (state) => {
            state.loading = false
        }

    }
})

// Action creators are generated for each case reducer function
export const { fetchStart, fetchStop } = loadingSlice.actions

export default loadingSlice.reducer