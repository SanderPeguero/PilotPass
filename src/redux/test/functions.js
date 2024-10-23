import { fetchStartTest, createTest, deleteTest, createQuestions, fetchTestSucceed, testFinished, testNextQuestion, testSetState, setResult, testRetry, createResponse} from "./slice";
import { createError } from "../error/errorSlice";
// import store from 'redux/toolkit'
import store from "../store"
import { getAuth } from "firebase/auth"
// import { db } from '../../firebase/firebase'
// import { ref, onValue } from 'firebase/database'
import { getDatabase, ref, onValue} from "firebase/database"

export function getChoiceQuestions(num, params) {
  return ( dispatch, getState ) => {

    //Gets all questions from the 415 questions test
    let questions = getState().test.response[params].preguntas;

    
    let selectedQuestions = [];
    
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * questions.length) - 1;
      selectedQuestions.push(questions[randomIndex]);
    }
    
    return selectedQuestions
  }
}

export function fetchExamById(examId){
  return (dispatch) => {
    try{

      const exam = store.getState().test.response[examId]
      dispatch(fetchExamSucceed(exam.preguntas))

    } catch (error){
      
      dispatch(createError(error))
      dispatch(fetchFailed(error))
      
    }
  }
}


export function fetchExams() {
  return dispatch => {
      try {

          const db = getDatabase()
          
          const auth = getAuth()
          const starCountRef = ref(db, 'exams/')
          
          onValue(starCountRef, (snapshot) => {
              const data = snapshot.val()
              dispatch(createResponse(data))
              
          })
          
          // dispatch(fetchStop())
      } catch (error) {
          dispatch(createError(error))
          dispatch(fetchfailed(error))
      }
  }
}

export function fetchRandomExam(params) {
  return (dispatch) => {
    try {
      // console.log("Entro el useEffect de la Lista")
      let quiz = dispatch(getChoiceQuestions(90, params)) //store.getState().courses.response[quizId];
      dispatch(fetchExamSucceed(quiz));
    } catch (error) {
      // dispatch(createError(error));
    }
  };
}

export function fetchExamSucceed(exam){
  console.log(exam)
  return dispatch => {
    dispatch(fetchTestSucceed({
      exam: exam,
      currentExamQuestion: exam[0]
    }))
  }
}


export function testAnswerClick(answerId) {
  console.log("Hasta aqui no hay fallos")
  return (dispatch, getState) => {
    const state = store.getState().test;

    // prevent event handles twice (on each click)
    let currentState = state.answerState;
    if (currentState) {
      const key = Object.keys(currentState)[0];
      if (currentState[key] === "success") return;
    }

    // initialize variables
    let activeQuestionNumber = state.activeQuestionNumber;
    let currentQuiz = state.test[activeQuestionNumber];
    let isRightAnswerChosen = currentQuiz.correctAnswer === answerId;
    let isFinalQuestion = activeQuestionNumber + 1 === state.test.length;

    // set answer state and first chosen result
    let answerState = isRightAnswerChosen ? "success" : "error";
    let results = state.results;
    if (results) {
      if (!results[activeQuestionNumber]) {
        dispatch(setResult(answerState));
      }
    }

    if (results[activeQuestionNumber] == "error") {
      dispatch(quizsetState({ [answerId]: answerState }, { ...results }));
    } else {
      dispatch(
        quizsetState(
          { [answerId]: answerState },
          { ...results, [activeQuestionNumber]: answerState }
        )
      );
    }

    // control colors changing and final state
    if (isRightAnswerChosen) {

      const timeout = window.setTimeout(() => {

        if (isFinalQuestion){ 
          console.log("Al finalizar...")
            dispatch(finishquiz())
        }else{

          let nextQuestionNumber = activeQuestionNumber + 1;
          dispatch(
            quiznextQuestion(nextQuestionNumber, state.test[nextQuestionNumber])
          );

          

        }

        window.clearTimeout(timeout);
      }, 500);
    }
  };
}

// export function fetchtestSucceed(test) {
//   return (dispatch) => {
//     dispatch(
//       fetchTestSucceed({
//         test: test,
//         currentTestQuestion: test[0],
//       })
//     );
//   };
// }

export function quizsetState(answerState, results) {
  return (dispatch) => {
    dispatch(
      testSetState({
        answerState: answerState,
        results: results,
      })
    );
  };
}

export function quiznextQuestion(nextQuestionNumber, nextQuizQuestion) {
  return (dispatch) => {
    dispatch(
      testNextQuestion({
        activeQuestionNumber: nextQuestionNumber,
        currentTestQuestion: nextQuizQuestion,
      })
    );
  };
}

export function finishquiz() {
  return (dispatch) => {
    dispatch(testFinished());
  };
}

export function retryExam() {
  return (dispatch) => {
    const state = store.getState().test;
    dispatch(resetExamState(state.test[0]));
  };
}

export function resetExamState(firstQuizQuestion) {
  return (dispatch) => {
    dispatch(
      testRetry({
        currentTestQuestion: firstQuizQuestion,
      })
    );
  };
}
