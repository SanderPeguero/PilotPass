import { CREATE_ERROR, UPDATE_ERROR, DELETE_ERROR } from "../actions/actionTypes"

const initialState = {
    Title: null,
    Error: null
}

export default function appErrorReducer(state = initialState, action){
    switch(action.type){
        case CREATE_ERROR:
            return{
                ...action,
                Title: action.Title,
                Error: action.Error
            }
        case UPDATE_ERROR:
            return{
                ...action,
                Title: action.Title,
                Error: action.Error
            }
        case DELETE_ERROR:
            return{
                ...action,
                Title: null,
                Error: null
            }
        default: 
            return state
    }
}