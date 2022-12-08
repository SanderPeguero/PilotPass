import { CREATE_ERROR, UPDATE_ERROR, DELETE_ERROR } from "./actionTypes"

export function CreateError(title, error){
    return {
        type: CREATE_ERROR,
        title: title,
        error: error
    }
}

export function UpdateError(title, error){
    return {
        type: UPDATE_ERROR,
        title: title,
        error: error
    }
}

export function DeleteError(){
    return {
        type: DELETE_ERROR,
    }
}