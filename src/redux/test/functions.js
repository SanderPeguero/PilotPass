import { createTest, createQuestions } from './slice'

export function getChoiceQuestions(num) {

    return (dispatch, getState) => {
        //Gets all questions from the 415 questions test
        let questions = getState().courses.response['-NJQ3XIELBr0xMsLKTHi'].preguntas

        let selectedQuestions = []

        for(let i = 0; i < num; i++){
            const randomIndex = (Math.floor(Math.random() * questions.length)-1)
            selectedQuestions.push(questions[randomIndex])
            // const randomQuestion = questions.splice(randomIndex, 1)
        }

        dispatch(createQuestions(selectedQuestions))
    }

}