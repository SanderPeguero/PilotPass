import { createContext, useState, useContext } from "react"

import { getDatabase, ref, set, onValue } from "firebase/database"
import { db } from '../services/firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export const ContextVariable = createContext()

export const useContextPilotPass = () => {
  const context = useContext(ContextVariable);
  if (!context) throw new Error('There is no Context provider');
  return context;
};

export function ProviderContext({ children }) {


  //User
  const [authToken, setauthToken] = useState(null);
  const [name, setname] = useState(null);
  const [accountsallowed, setaccountsallowed] = useState(null);

  //Reducers
  const authSucceed = (data) => setauthToken(data);

  const updateName = (data) => setname(data);

  const deleteName = () => setname(null);

  const AccountsAllowed = (data) => setaccountsallowed(data);

  //Functions
  const auth = (email, password, isLogIn) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const expirationDate = new Date(user["stsTokenManager"]["expirationTime"]);

        user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
          authSucceed(token);
        });

        const expiration = (expirationDate.getTime() - Date.now()) / 1000;
        localStorage.setItem("expirationDate", expiration);
        autoLogout(expiration);

        localStorage.setItem("displayName", user.displayName);
        updateName(user.displayName);
      })
      .catch((error) => {
        createError(error.message);
      });
  };


  async function signup(name, lastName, email, password, bio, formation, admin, account, isLogIn) {
    try {
      const auth1 = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth1, email, password);

      console.log(user)

      const expirationDate = new Date(Date.now() + user.stsTokenManager.expirationTime * 1000);
      localStorage.setItem("token", user.stsTokenManager.accessToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("displayName", `${name} ${lastName}`);

      await updateProfile(auth1.currentUser, { displayName: `${name} ${lastName}` });

      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        name,
        lastName,
        email,
        password,
        bio,
        formation,
        admin,
        account,
      });

      autoLogout(user.stsTokenManager.expirationTime);
      autoLogin();
    } catch (error) {
      createError(error.message || error);
    }
  }


  function autoLogin() {
    const token = localStorage.getItem("token");
    const displayName = localStorage.getItem("displayName");
    const expiration = new Date().getTime() + localStorage.getItem("expirationDate") * 1000;

    if (!token || new Date(expiration) <= new Date()) {
      logout();
    } else {
      authSucceed(token);
      autoLogout((expiration - new Date().getTime()) / 1000);
      updateName(displayName);
    }
  }

  function autoLogout(timeInSeconds) {
    setTimeout(() => {
      logout();
      window.location.replace('/');
      createError("The current session expired");
    }, timeInSeconds * 1000);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("displayName");

    setauthToken(null);
    deleteName();
  }

  //Creator
  const [subject, setsubject] = useState(null);
  // const [response, setresponse] = useState(null); Deprecated
  const [CreatorResponse, setCreatorResponse] = useState(null);

  // Reducers
  const createSubject = (data) => setsubject(data);

  const resetSubject = () => setsubject(null);

  const createResponse = (data) => setCreatorResponse(data);

  const resetResponse = () => setCreatorResponse(null);


  // Functions
  async function postSubject(state) {
    try {
      const response = await axios.post("quizList.json", state);

      createResponse(response.statusText === "OK" ? "Subject Saved" : response.statusText);
      resetSubject();
    } catch (error) {
      createError(error);
    }
  }

  const resetsubject = resetSubject;

  //Courses
  const [quizList, setquizList] = useState([]);
  const [isLoading, setisLoading] = useState(null);
  const [activeQuestionNumber, setactiveQuestionNumber] = useState(0);
  const [currentQuizQuestion, setcurrentQuizQuestion] = useState({});
  const [isQuizFinished, setisQuizFinished] = useState(false);
  const [answerState, setanswerState] = useState(null);
  const [results, setresults] = useState({});
  const [quiz, setquiz] = useState(null);
  const [response, setresponse] = useState(null);

  // Reducers
  const setResponse = setresponse;

  const fetchFailed = (data) => {
    setisLoading(false);
    createError(data);
  };

  const fetchQuizListSucceed = (data) => {
    setisLoading(false);
    setquizList(data);
  };

  const fetchQuizSucceed = (data) => {
    setisLoading(false);
    setquiz(data.quiz);
    setcurrentQuizQuestion(data.currentQuizQuestion);
  };

  const quizSetState = ({ answerState, results }) => {
    setanswerState(answerState);
    setresults(results);
  };

  const quizNextQuestion = ({ activeQuestionNumber, currentQuizQuestion }) => {
    setactiveQuestionNumber(activeQuestionNumber);
    setcurrentQuizQuestion(currentQuizQuestion);
    setanswerState(null);
  };

  const quizFinished = () => setisQuizFinished(true);

  const quizRetry = ({ currentQuizQuestion }) => {
    setcurrentQuizQuestion(currentQuizQuestion);
    setactiveQuestionNumber(0);
    setisQuizFinished(false);
    setanswerState(null);
    setresults({});
  };

  const setResults = (data) => setresults(data.answerState);

  // New Navigation functions
  const goToPrevQuestion = () => {
    if (activeQuestionNumber > 0 && quiz) {
      quiznextQuestion(activeQuestionNumber - 1, quiz[activeQuestionNumber - 1]);
    }
  };

  const goToNextQuestion = () => {
    if (activeQuestionNumber < quiz.length - 1 && quiz) {
      quiznextQuestion(activeQuestionNumber + 1, quiz[activeQuestionNumber + 1]);
    }
  };


  //Functions
  function fetchQuizList() {
    try {
      const starCountRef = ref(db, 'quizList/');
      const auth = getAuth();

      onValue(starCountRef, (snapshot) => {
        fetchResponse(snapshot.val());
      });
    } catch (error) {
      createError(error);
      fetchfailed(error);
    }
  }

  function fetchQuizById(course, quizId) {
    try {
      const quizData = response[course]?.[quizId];
      if (quizData) {
        // Load progress if available
        let savedProgress = null;
        try {
          const localStr = localStorage.getItem(`quizProgress_${course}_${quizId}`);
          if (localStr) {
             savedProgress = JSON.parse(localStr);
          }
        } catch(e) { console.error("Error reading progress", e); }

        const qList = quizData.preguntas;
        setisLoading(false);
        setquiz(qList);

        if (savedProgress) {
            setactiveQuestionNumber(savedProgress.activeQuestionNumber);
            setcurrentQuizQuestion(qList[savedProgress.activeQuestionNumber]);
            setresults(savedProgress.results);
            setanswerState(savedProgress.answerState);
        } else {
            setactiveQuestionNumber(0);
            setcurrentQuizQuestion(qList[0]);
            setresults({});
            setanswerState(null);
            setisQuizFinished(false);
        }
      } else {
        createError("Quiz not found");
      }
    } catch (error) {
      createError(error);
      fetchfailed(error);
    }
  }


  function saveProgress(course, quizId, stateUpdates) {
      const progress = {
          activeQuestionNumber: stateUpdates.activeQuestionNumber !== undefined ? stateUpdates.activeQuestionNumber : activeQuestionNumber,
          results: stateUpdates.results || results,
          answerState: stateUpdates.answerState || answerState,
      };
      localStorage.setItem(`quizProgress_${course}_${quizId}`, JSON.stringify(progress));

      const authObj = getAuth();
      if(authObj.currentUser) {
          const progressRef = ref(db, `users/${authObj.currentUser.uid}/progress/${course}_${quizId}`);
          set(progressRef, progress);
      }
  }


  function quizAnswerClick(answerId, course, quizId) {
    try {
      const isExamSimulation = localStorage.getItem('isExamSimulation') === 'true';

      // Prevent event handles twice (on each click) only in regular mode when they get it right
      if (!isExamSimulation && answerState && Object.values(answerState)[0] === "success") return;

      // Initialize variables
      const currentQuiz = quiz[activeQuestionNumber];
      const isRightAnswerChosen = currentQuiz.correctAnswer === answerId;
      const isFinalQuestion = activeQuestionNumber + 1 === quiz.length;

      // Set answer state and first chosen result
      const internalAnswerState = isRightAnswerChosen ? "success" : "error";

      let updatedResults = { ...results };

      // If it's the very first time they are answering THIS question, record the result
      if (!results[activeQuestionNumber]) {
        updatedResults = { ...results, [activeQuestionNumber]: internalAnswerState };
        setresults(updatedResults); // Directly setting results array since quizSetState doesn't merge
      }

      if (isExamSimulation) {
          // Exam Simulation: Do not show right/wrong. Just show it as selected.
          const newAnswerState = { [answerId]: "selected" }; // Wait, there's no selected CSS class by default, let's just use success color but we actually shouldn't give it away. Let's use 'selected' assuming we'll add it or it will just be a neutral state. Actually 'success' is green, 'error' is red. In exam mode, maybe we don't show any colors until the end?
          // I will use "selected" and we can add a simple CSS class if needed.
          const currentAnswerState = { [answerId]: "selected" };
          quizsetState(currentAnswerState, updatedResults);
          saveProgress(course, quizId, { answerState: currentAnswerState, results: updatedResults });
          // In exam simulation, don't automatically move to next question
      } else {
          // Regular Mode: Show right/wrong immediately
          // Keep showing their choice as success/error
          const currentAnswerState = { [answerId]: internalAnswerState };
          quizsetState(currentAnswerState, updatedResults);
          saveProgress(course, quizId, { answerState: currentAnswerState, results: updatedResults });

          // We remove the automatic progression to the next question,
          // because we added a 'Next' button specifically for this so the user can manually proceed.
      }

    } catch (error) {
      createError(error);
    }
  }


  function fetchfailed(error) {
    fetchFailed(error);
  }

  function fetchResponse(quizList) {
    setResponse(quizList);
  }

  function fetchquizSucceed(quiz) {
    fetchQuizSucceed({
      quiz,
      currentQuizQuestion: quiz[0],
    });
  }

  function quizsetState(answerState, results) {
    quizSetState({ answerState, results });
  }

  function quiznextQuestion(nextQuestionNumber, nextQuizQuestion) {
    quizNextQuestion({
      activeQuestionNumber: nextQuestionNumber,
      currentQuizQuestion: nextQuizQuestion,
    });

    // Attempt to extract course and quizId from current window location as a fallback,
    // though in a real app this would be passed around cleanly.
    // Here we'll do a quick check of hash routing
    const match = window.location.hash.match(/#\/quiz\/([^\/]+)\/([^\/]+)/);
    if(match) {
        saveProgress(match[1], match[2], { activeQuestionNumber: nextQuestionNumber });
    }
  }

  function finishquiz() {
    quizFinished();
  }

  function retryQuiz() {
    if (quiz) resetquizState(quiz[0]);
  }

  function resetquizState(firstQuizQuestion) {
    quizRetry({ currentQuizQuestion: firstQuizQuestion });
  }

  //Exam
  const [ExamResponse, setExamResponse] = useState(null);
  const [Exam, setExam] = useState(null);
  const [questions, setquestions] = useState([]);
  const [ExamIsLoading, setExamIsLoading] = useState(null);
  const [currentTestQuestion, setcurrentTestQuestion] = useState({});
  const [ExamAnswerState, setExamAnswerState] = useState(null);
  const [ExamActiveQuestionNumber, setExamActiveQuestionNumber] = useState(0);
  const [ExamResults, setExamResults] = useState({});
  const [isExamFinished, setisExamFinished] = useState(false);

  // Reducers
  const CreateExamResponse = setExamResponse;

  const fetchExamStart = () => setExamIsLoading(true);

  const fetchExamFailed = (data) => {
    setExamIsLoading(false);
    seterror(data.error);
  };

  const createExam = setExam;

  const deleteExam = () => setExam(null);

  const createQuestion = setquestions;

  const fetchExamSucceed = (data) => {
    setExamIsLoading(false);
    setExam(data.exam);
    setcurrentTestQuestion(data.currentExamQuestion);
  };

  const ExamFinished = () => setisExamFinished(true);

  const ExamNextQuestion = (data) => {
    setExamActiveQuestionNumber(data.activeQuestionNumber);
    setcurrentTestQuestion(data.currentTestQuestion);
    setExamAnswerState(null);
  };

  const ExamSetState = ({ answerState, results }) => {
    setExamAnswerState(answerState);
    setExamResults(results);
  };

  const setResult = ({ answerState }) => setExamResults(answerState);

  const ExamRetry = ({ currentTestQuestion }) => {
    setcurrentTestQuestion(currentTestQuestion);
    setExamActiveQuestionNumber(0);
    setisExamFinished(false);
    setExamAnswerState(null);
    setExamResults({});
  };


  // Functions
  function getChoiceQuestions(num, params) {
    const questions = ExamResponse[params].preguntas;
    const selectedQuestions = [];

    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      selectedQuestions.push(questions[randomIndex]);
    }

    return selectedQuestions;
  }

  function fetchExamById(examId) {
    try {
      const exam = store.getState().test.response[examId];
      fetchexamSucceed(exam.preguntas);
    } catch (error) {
      createError(error);
      fetchExamFailed(error);
    }
  }

  function fetchExams() {
    try {
      const starCountRef = ref(db, 'exams/');
      onValue(starCountRef, (snapshot) => {
        setExamResponse(snapshot.val());
      });
      fetchStop();
    } catch (error) {
      createError(error);
      fetchExamFailed(error);
    }
  }

  function fetchRandomExam(params) {
    try {
      const quiz = getChoiceQuestions(90, params);
      fetchexamSucceed(quiz);
    } catch (error) {
      createError(error);
    }
  }

  function fetchexamSucceed(exam) {
    fetchExamSucceed({
      exam,
      currentExamQuestion: exam[0],
    });
  }


  function ExamAnswerClick(answerId) {
    // Prevent handling the same click twice
    if (answerState && Object.values(answerState)[0] === "success") return;

    // Initialize variables
    const currentQuiz = Exam[ExamActiveQuestionNumber];
    const isRightAnswerChosen = currentQuiz.correctAnswer === answerId;
    const isFinalQuestion = ExamActiveQuestionNumber + 1 === Exam.length;

    // Set answer state and first chosen result
    const internalAnswerState = isRightAnswerChosen ? "success" : "error";

    // Update results if it's the first answer for the current question
    if (ExamResults && !ExamResults[ExamActiveQuestionNumber]) {
      setResult(internalAnswerState);
    }

    const updatedResults = ExamResults[ExamActiveQuestionNumber] === "error"
    ? { [answerId]: internalAnswerState, ...ExamResults }
    : { ...ExamResults, [ExamActiveQuestionNumber]: internalAnswerState };

    examsetState({ [answerId]: internalAnswerState }, updatedResults);

    // Control colors changing and move to next question
    if (isRightAnswerChosen) {
      setTimeout(() => {
        if (isFinalQuestion) {
          ExamFinished();
        } else {
          ExamnextQuestion(ExamActiveQuestionNumber + 1, Exam[ExamActiveQuestionNumber + 1]);
        }
      }, 500);
    }
  }

  function examsetState(answerState, results) {
    ExamSetState({ answerState, results });
  }

  const ExamnextQuestion = (nextQuestionNumber, nextQuizQuestion) => {
    ExamNextQuestion({
      activeQuestionNumber: nextQuestionNumber,
      currentTestQuestion: nextQuizQuestion
    });
  }

  function retryExam() {
    resetExamState(Exam[0]);
  }

  function resetExamState(firstQuizQuestion) {
    ExamRetry({ currentTestQuestion: firstQuizQuestion });
  }

  //Loading
  const [loading, setloading] = useState(false);

  //reducers
  const startLoading = () => setloading(true);
  const stopLoading = () => setloading(false);
  const fetchStart = () => setloading(true);
  const fetchStop = () => setloading(false);

  //Error
  const [error, seterror] = useState(null);

  const createError = seterror;
  const updateError = seterror;
  const deleteError = () => seterror(null);


  return (
    <ContextVariable.Provider value={{
      authToken,
      name,
      accountsallowed,
      quizList,
      isLoading,
      error,
      activeQuestionNumber,
      currentQuizQuestion,
      isQuizFinished,
      answerState,
      results,
      quiz,
      response,
      loading,
      auth,
      autoLogin,
      signup,
      fetchQuizList,
      fetchQuizById,
      quizAnswerClick,
      retryQuiz,
      goToPrevQuestion,
      goToNextQuestion,
      finishquiz,
      fetchStart,
      fetchStop,
      createError,
      updateError,
      deleteError,
      logout,
      startLoading,
      stopLoading,
      Exam,
      ExamActiveQuestionNumber,
      currentTestQuestion,
      isExamFinished,
      ExamAnswerState,
      ExamIsLoading,
      ExamResponse,
      ExamResults,
      ExamAnswerClick,
      retryExam,
      resetExamState,
      fetchExams,
      fetchRandomExam,
    }}>
      {children}
    </ContextVariable.Provider>
  );
}