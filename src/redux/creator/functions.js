import axios from "../../axios/axios-quiz";
import { createError } from "../error/errorSlice";
import { createResponse, resetSubject } from "./slice";

export function postSubject(state) {
    
    return async dispatch => {
        
        try {
            
            const response = await axios.post("quizList.json", state);
            
            if(response.statusText == "OK"){
            
                dispatch(createResponse("Subject Saved"))
            
            }else{
            
                dispatch(createResponse(response.statusText))

            }

            dispatch(resetSubject())

        } catch (error) {

            dispatch(createError(error))   

        }
    }

}

export function resetsubject() {

    return dispatch => {
    
        dispatch(resetSubject())
        
    }

}