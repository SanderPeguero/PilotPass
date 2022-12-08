import { combineReducers } from "redux"
import authReducer from './authReducer'
import quizReducer from './quizReducer'
import quizCreatorReducer from './quizCreatorReducer'
import appErrorReducer from './appError'

export default combineReducers({
    authControl: authReducer,
    currentQuiz: quizReducer,
    quizCreator: quizCreatorReducer,
    appError: appErrorReducer
})