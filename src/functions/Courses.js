
//Courses Reducers
export const fetchStart = () => {
    setisLoading(true)
}

export const fetchFailed = (action) => {
    setisLoading(false)
    seterror(action)
}

export const fetchQuizListSucceed = (quizList) => {
    setisLoading(false)
    setquizList(quizList)
}

export const fetchQuizSucceed = (quiz, question) => {
    setisLoading(false)
    setquiz(quiz)
    setcurrentQuizQuestion(question)
}

export const quizSetState = (answerState, results) => {
    setanswerState(answerState)
    setresults(results)
}

export const quizNextQuestion = (questionNumber, currentQuestion) => {
    setactiveQuestionNumber(questionNumber)
    setcurrentQuizQuestion(currentQuestion)
    setanswerState(null)
}

export const quizFinished = () => {
    setisQuizFinished(true)
}

export const quizRetry = (currentQuizQuestion) => {
    setcurrentQuizQuestion(currentQuizQuestion)
    setactiveQuestionNumber(0)
    setisQuizFinished(false)
    setanswerState(null)
    setresults({})
}

export const setResult = (answerState) => {
    setResult(answerState)
}

export const fetchQuizList = () => {
    try {

        const starCountRef = ref(db, 'quizList/')
        const auth = getAuth()

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            fetchResponse(data)
        })

    } catch (error) {
        createError(error)
        fetchfailed(error)
    }
}

export function fetchQuizById(course, quizId) {
    try {
        const coursePull = store.getState().courses.response[course]
        const quiz = coursePull[quizId]
        fetchquizSucceed(quiz.preguntas)
    } catch (error) {
        createError(error)
        fetchfailed(error)
    }
}

export function quizAnswerClick(answerId) {

    const state = store.getState().courses

    // prevent event handles twice (on each click)
    let currentState = state.answerState
    if (currentState) {
        const key = Object.keys(currentState)[0]
        if (currentState[key] === "success") return
    }

    // initialize variables
    let activeQuestionNumber = state.activeQuestionNumber
    let currentQuiz = state.quiz[activeQuestionNumber]
    let isRightAnswerChosen = currentQuiz.correctAnswer === answerId
    let isFinalQuestion = activeQuestionNumber + 1 === state.quiz.length

    // set answer state and first chosen result
    let answerState = isRightAnswerChosen ? "success" : "error"
    let results = state.results
    if (results) {
        if (!results[activeQuestionNumber]) {
            setResult(answerState)
        }
    }

    if (results[activeQuestionNumber] == "error") {
        quizsetState({ [answerId]: answerState }, { ...results })
    } else {
        quizsetState({ [answerId]: answerState }, { ...results, [activeQuestionNumber]: answerState })
    }

    // control colors changing and final state
    if (isRightAnswerChosen) {
        const timeout = window.setTimeout(() => {
            if (isFinalQuestion)
                finishquiz()
            else {
                let nextQuestionNumber = activeQuestionNumber + 1
                quiznextQuestion(nextQuestionNumber, state.quiz[nextQuestionNumber])
            }
            window.clearTimeout(timeout)
        }, 500)
    }
}

export function fetchfailed(error){
    fetchFailed(error)
}

export function fetchquizListSucceed(quizList){
    fetchQuizListSucceed({
        quizList: quizList
    })
}

export function fetchResponse(quizList){
    setresponse(quizList)
}

export function fetchquizSucceed(quiz){
    fetchQuizSucceed({
        quiz: quiz,
        currentQuizQuestion: quiz[0]
    })
}

export function quizsetState(answerState, results){
    quizSetState({
        answerState: answerState,
        results: results
    })
}

export function quiznextQuestion(nextQuestionNumber, nextQuizQuestion){
    quizNextQuestion({
        activeQuestionNumber: nextQuestionNumber,
        currentQuizQuestion: nextQuizQuestion
    })
}

export function finishquiz(){
    quizFinished()
}

// export const retryQuiz = () => {
//     const state = store.getState().courses
//     resetquizState(state.quiz[0])
// }

export function resetquizState(firstQuizQuestion){
    quizRetry({
        currentQuizQuestion: firstQuizQuestion
    })
}