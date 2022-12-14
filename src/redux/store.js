import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authTokenReducer from './user/authTokenSlice'
import errorReducer from './error/errorSlice'

export default configureStore({
    
  reducer: {
      user: authTokenReducer,
      error: errorReducer
  },

  devTools: true

})