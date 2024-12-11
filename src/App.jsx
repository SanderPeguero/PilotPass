import { useEffect, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Quiz from './pages/Tests/Quiz/Quiz.jsx';
import QuizList from './pages/Tests/QuizList/QuizList.jsx';
import Exam from './pages/Exams/Exam/Exam.jsx';
import ExamList from './pages/Exams/ExamList/ExamList.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Logout from './components/Logout/Logout.jsx';
import Layout from './hoc/Layout/Layout.jsx';
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx';
import TestResult from './containers/TestResult/TestResult.jsx';
import Result from './containers/Result/Result.jsx';
import Store from './containers/store/store';
import Worldchat from './containers/worldchat/App';
import Devchat from './containers/devchat/App';
import Loader from './components/Loader/Loader.jsx';
import RentPlanes from './pages/RentPlanes/RentPlanes.jsx';

// Context
import { useContextPilotPass } from './Context.jsx';

// Custom Hook for Data Fetching Logic
const useDataFetching = (isAuthorized, testResponseAvailable, examResponseAvailable, fetchQuizList, fetchExams) => {
  const [loading, setLoading] = useState(true);  // State to track loading state
  const [error, setError] = useState(null);      // State to track any errors

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthorized) {
        try{
          // Fetch quiz list if not already available
          if (!testResponseAvailable) await fetchQuizList();
          // Fetch exams if not already available
          if (!examResponseAvailable) await fetchExams();
        }catch(err){
          setError('Error fetching data');  // Set error message if data fetching fails
        }finally {
          setLoading(false);  // Mark the loading state as false once fetching is done
        }
      }else{
        setLoading(false)
      }
    };

    fetchData();  // Execute data fetching function
  }, [isAuthorized, testResponseAvailable, examResponseAvailable, fetchQuizList, fetchExams]);

  return { loading, error };  // Return loading and error state
};

// Routing Logic
const getRoutes = (isAuthorized) => {
  if (!isAuthorized) {
    // Return login and signup routes if the user is not authorized
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  // Return routes that require authorization, wrapped in Layout component
  return (
    <Layout>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/store" element={<Store />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/exams/:id" element={<Exam />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/testresult" element={<TestResult />} />
        <Route path="/worldchat" element={<Worldchat />} />
        <Route path="/devchat" element={<Devchat />} />
        <Route path="/" element={<QuizList />} />
        <Route path="/RentPlanes" element={<RentPlanes />} />
        <Route path="/quiz/:course/:id" element={<Quiz />} />

      </Routes>
    </Layout>
  );
};

const App = () => {
  // Extract values from the context
  const { authToken, response, ExamResponse, autoLogin, fetchQuizList, fetchExams } = useContextPilotPass();

  const isAuthorized = Boolean(authToken);  // Boolean indicating if user is authorized
  const testResponseAvailable = Boolean(response);  // Boolean indicating if quiz data is available
  const examResponseAvailable = Boolean(ExamResponse);  // Boolean indicating if exam data is available

  // Auto login function triggered on initial load
  useEffect(() => {
    autoLogin();  // Call autoLogin function from context
  }, [autoLogin]);

  // Use custom hook for data fetching logic
  const { loading, error } = useDataFetching(
    isAuthorized,
    testResponseAvailable,
    examResponseAvailable,
    fetchQuizList,
    fetchExams
  );

  // If still loading, show a loading message
  if (loading) return <div><Loader/></div>;

  // If an error occurred during data fetching, show an error message
  if (error) return <div>{error}</div>;

  // Render routes based on the authorization state
  return getRoutes(isAuthorized);
};

export default App;




{/* <Route exact path={'/'} element={<Home/>}></Route> */}
{/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
{/* <Route exact path={'/quiz-creator'} element={<QuizCreator/>} ></Route> */}
{/* <Route exact path={'/quiz/:id'} element={<Quiz/>}></Route>
<Route exact path={'/tests'} element={<QuizList/>}></Route> */}
{/* <Route path="*" element={<Navigate to="/tests" replace/>}/> */}
{/* <Route exact path={'/tests'} element={<QuizList/>}></Route> */}
{/* <Route path="*" element={<Navigate to="/tests" replace/>}/> */}
