import { Component, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Navigate, Router } from 'react-router-dom'

//Components
import Layout from './hoc/Layout/Layout.jsx'
import Logout from './components/Logout/Logout.jsx'
// import Quiz from './containers/Quiz/Quiz.jsx'
// import QuizList from './containers/QuizList/QuizList.jsx'
// import QuizCreator from './containers/QuizCreator/QuizCreator.jsx'
// import Payment from './components/Payment/Wallet.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Home from './pages/home/home.jsx'
import HomeBox from './pages/home/Home/Home.jsx'
import HomeMain from './pages/HomeW/HomeMain.jsx'
import Alert from './components/Alert/Snackbar'
// import Signup2 from './components/Signup2/signup.jsx'

// import { autoLogin } from './store/actions/authActions'
import { autoLogin, logout } from './redux/user/authFunctions.js'
import { authSucceed } from './redux/user/authTokenSlice.js'


const App = () => {

  const dispatch = useDispatch();
  const authToken = Boolean(useSelector(state => state.user.authToken));
  const error = null


  useEffect(() => {
    dispatch(autoLogin())
    // dispatch(authSucceed('Sander seteo el estado'))
    // console.log(localStorage.token)
  });

  // useEffect(() => {
  //   console.log(error)
  // },[error]);

  // useEffect(() => {
  //   console.log(localStorage.token)
  // },[localStorage.token]);

  if(!authToken){
      
    return(
        <Routes>
          
          {/* <Route exact path={'/'} element={
            <div>
              <Alert severity={5} title={"Error"} detail={"Error en la app"}/>
              <Home/>
            </div>
          }></Route> */}
          <Route exact path='/' element={<Login/>} ></Route>
          <Route exact path='/signup' element={<Signup/>} ></Route>
          {/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
          {/* <Route path={'/quiz/:id'} element={<Quiz/>}></Route> */}
          {/* <Route exact path={'/tests'} element={<QuizList/>}></Route> */}
        </Routes>
    )
    
  }else{

   return(
      <Layout>
        <Routes>
          {/* <Route exact path={'/'} element={<div>Auth Paso</div>}></Route> */}
          <Route exact path={'/'} element={<Home/>}></Route>
          <Route exact path={'/logout'} element={<Logout/>}></Route>
          {/* <Route exact path={'/quiz-creator'} element={<QuizCreator/>} ></Route> */}
          {/* <Route exact path={'/payment'} element={<Payment/>} ></Route> */}
          {/* <Route exact path={'/quiz/:id'} element={<Quiz/>}></Route> */}
          {/* <Route exact path={'/tests'} element={<QuizList/>}></Route> */}
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Layout>
    )

  }

}

export default App
