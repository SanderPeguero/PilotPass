import { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

//Components
import Layout from './hoc/Layout/Layout.jsx'
import Logout from './components/Logout/Logout.jsx'
import Quiz from './containers/Quiz/Quiz.jsx'
import QuizList from './containers/QuizList/QuizList.jsx'
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx'
import Payment from './components/Payment/Wallet.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Home from './pages/home/home.jsx'
import Alert from './components/Alert/Snackbar'
import Signup2 from './components/Signup2/signup.jsx'

import { autoLogin } from './store/actions/authActions'


class App extends Component {

  componentDidMount(){
    this.props.autoLogin()
  }

  render(){
    
    // const Navigate = useNavigate();

    // useEffect(() => {
      
    // }, [this.props.appError]);
    
    if(!this.props.isAuthenticated){
      
      return(
          <Routes>
            
            <Route exact path={'/'} element={
              <div>
                {/* <Alert severity={4} title={"Error"} detail={"Error en la app"}/> */}
                <Home/>
              </div>
            }></Route>
            <Route exact path='/login' element={<Login/>} ></Route>
            <Route exact path='/signup' element={<Signup2/>} ></Route>
            <Route path="*" element={<Navigate to="/" replace/>}/>
            {/* <Route path={'/quiz/:id'} element={<Quiz/>}></Route> */}
            {/* <Route exact path={'/tests'} element={<QuizList/>}></Route> */}
          </Routes>
      )
      
    }else{

     return(
        <Layout>
          <Routes>
            {/* <Route exact path={'/'} element={<Home/>}></Route> */}
            <Route exact path={'/logout'} element={<Logout/>}></Route>
            <Route exact path={'/quiz-creator'} element={<QuizCreator/>} ></Route>
            <Route exact path={'/payment'} element={<Payment/>} ></Route>
            <Route exact path={'/quiz/:id'} element={<Quiz/>}></Route>
            <Route exact path={'/tests'} element={<QuizList/>}></Route>
            <Route path="*" element={<Navigate to="/tests" replace/>}/>
          </Routes>
        </Layout>
      )

    }
  }
}


function mapStateToProps(state){
  
  return {
    isAuthenticated: Boolean(state.authControl.authToken)
  }
  
}

function mapDispatchToProps(dispatch) {

  return {
    autoLogin: () => dispatch(autoLogin())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
