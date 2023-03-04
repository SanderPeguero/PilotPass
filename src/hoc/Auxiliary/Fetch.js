import { fetchQuizList } from "../../redux/courses/functions"
import { fetchStart, fetchStop } from "../../redux/loading/slice"
import { autoLogin } from "../../redux/user/authFunctions"


export function fetchQuizListRx(){
    return (dispatch) => {
        dispatch(fetchStart())
        dispatch(fetchQuizList())
        dispatch(fetchStop())
    }
}

export function autoLoginRx(){
    return (dispatch) => {
        dispatch(fetchStart())
        dispatch(autoLogin())
        dispatch(fetchStop())
    }
}