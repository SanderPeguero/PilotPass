import { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'

//Components
// import Auth from './containers/Auth/Auth.jsx'
import Layout from './hoc/Layout/Layout.jsx'
import Logout from './components/Logout/Logout.jsx'
import Quiz from './containers/Quiz/Quiz.jsx'
import QuizList from './containers/QuizList/QuizList.jsx'
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx'
import Payment from './components/Payment/Wallet.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Home from './pages/home/home.jsx'

import { autoLogin } from './store/actions/authActions'


class App extends Component {

  componentDidMount(){
    this.props.autoLogin()
  }

  render(){

    let routes = (
        <Routes>
          <Route path={'/'} exact element={<Home/>}></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/signup' element={<Signup/>} ></Route>
          {/* <Route path={'/quiz/:id'} element={<Quiz/>}></Route> */}
          <Route path={'/tests'} element={<QuizList/>}></Route>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    )

    if(this.props.isAuthenticated){
      routes = (
          <Routes>
            <Route path={'/'} exact element={<Home/>}></Route>
            <Route path={'/tests'} element={<QuizList/>}></Route>
            <Route path={'logout'} element={<Logout/>}></Route>
            <Route path={'/quiz-creator'} element={<QuizCreator/>} ></Route>
            <Route path={'/payment'} element={<Payment/>} ></Route>
            <Route path={'/quiz/:id'} element={<Quiz/>}></Route>
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
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
