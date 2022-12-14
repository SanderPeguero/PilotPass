import { createSlice } from '@reduxjs/toolkit'

export const authTokenSlice = createSlice({
  
    name: 'user',
  
    initialState: {
        authToken: null,
        name: null
    },

    reducers: {
      
        authSucceed: (state, action) => {
            state.authToken = action.payload
        },

        autoLogout: state => {
            state.authToken = null
        },

        updateName: (state, action) => {
            state.name = action.payload
        },

        deleteName: state => {
            state.name = null
        }

    }
})

// Action creators are generated for each case reducer function
export const { authSucceed, autoLogout, updateName, deleteName } = authTokenSlice.actions

export default authTokenSlice.reducer
