import { useEffect } from 'react'
import { autoLogin } from './redux/user/authFunctions.js'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//Components
// import Home from './pages/home/home.jsx'
import Quiz from './containers/Quiz/Quiz.jsx'
import Login from './components/Login/Login.jsx'
import Layout from './hoc/Layout/Layout.jsx'
import Signup from './components/Signup/Signup.jsx'
import Logout from './components/Logout/Logout.jsx'
import QuizList from './containers/QuizList/QuizList.jsx'
import { fetchQuizList } from "./redux/courses/functions"
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx'
import TestResult from './containers/TestResult/TestResult.jsx'
import Result from './containers/Result/Result.jsx'
import AnswerResult from './components/AnswerResult/AnswerResult.jsx'
import { fetchStart, fetchStop } from './redux/loading/slice'

const App = () => {

  const dispatch = useDispatch()
  const authToken = Boolean(useSelector(state => state.user.authToken))
  const response = useSelector(state => state.courses.response)
  
  useEffect(() => {
    dispatch(fetchStart())
    dispatch(autoLogin())
    dispatch(fetchStop())
  }, [])

  useEffect(() => {
    console.log("UseEffect AuthToken: " + authToken)
    if(authToken) {
      console.log("UseEffect AuthToken is True: " + authToken)
      if(response){
        console.log("UseEffect AuthToken is true but response is false: " + response)
        dispatch(fetchStart())
        dispatch(fetchQuizList())
        dispatch(fetchStop())
      }
    }
  }, [authToken])


  if(!authToken){
    return(
        <Routes>
          <Route exact path='/' element={<Login/>} ></Route>
          <Route exact path='/signup' element={<Signup/>} ></Route>
        </Routes>
    )
    
  }else{
    return(
      <Layout>
        <Routes>
          <Route exact path={'/logout'} element={<Logout/>}></Route>
          <Route exact path={'/result/:id'} element={<Result/>}></Route>
          <Route exact path={'/testresult'} element={<TestResult/>}></Route>
          <Route exact path={'/'} element={<QuizList/>}></Route>
          <Route path={'/quiz/:id'} element={<Quiz/>}></Route>
          
        </Routes>
      </Layout>
    )

  }

}

export default App


{/* <Route exact path={'/'} element={<Home/>}></Route> */}
{/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
{/* <Route exact path={'/quiz-creator'} element={<QuizCreator/>} ></Route> */}
{/* <Route exact path={'/quiz/:id'} element={<Quiz/>}></Route>
<Route exact path={'/tests'} element={<QuizList/>}></Route> */}
{/* <Route path="*" element={<Navigate to="/tests" replace/>}/> */}
{/* <Route exact path={'/tests'} element={<QuizList/>}></Route> */}
{/* <Route path="*" element={<Navigate to="/tests" replace/>}/> */}
