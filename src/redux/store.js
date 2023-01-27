import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authTokenReducer from './user/authTokenSlice'
import errorReducer from './error/errorSlice'
import creatorReducer from './creator/slice'
import coursesReducer from './courses/slice'
import testReducer from './test/slice'

export default configureStore({
    
  reducer: {
      user: authTokenReducer,
      creator: creatorReducer,
      courses: coursesReducer,
      error: errorReducer,
      test: testReducer
  },

  devTools: true

})