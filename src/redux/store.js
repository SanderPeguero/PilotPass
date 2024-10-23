import { configureStore } from '@reduxjs/toolkit'
import authTokenReducer from './user/authTokenSlice'
import errorReducer from './error/errorSlice'
import creatorReducer from './creator/slice'
import coursesReducer from './courses/slice'
import loadingReducer from './loading/slice'
import testReducer from './test/slice'

export default configureStore({
    
  reducer: {
      user: authTokenReducer,
      creator: creatorReducer,
      courses: coursesReducer,
      test: testReducer,
      error: errorReducer,
      loading: loadingReducer
  },

  devTools: true

})