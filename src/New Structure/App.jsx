//dependencies
import { useEffect, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//components
import Quiz from './containers/Quiz'
import QuizList from './containers/QuizList'
import Exam from './containers/Exam'
import ExamList from './containers/ExamList'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Layout from './layouts/Layout'
import QuizCreator from './containers/QuizCreator'
import TestResult from './containers/TestResult'
import Result from './containers/Result.jsx'
import Loader from './utils/Loader.jsx'
import PasswordProtected from '../components/PasswordProtected';

//apps
import RentPlanes from './containers/RentPlanes/RentPlanes';
import Worldchat from './containers/WorldChat/App'
import Devchat from './containers/DevChat/App'

//contexts
import { useContextPilotPass } from './contexts/Context';

// Custom Hook for Data Fetching Logic
const useDataFetching = (isAuthorized, testResponseAvailable, examResponseAvailable, fetchQuizList, fetchExams) => {
  const [loading, setLoading] = useState(true);  // State to track loading state
  const [error, setError] = useState(null);      // State to track any errors

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthorized) {
        try {
          // Fetch quiz list if not already available
          if (!testResponseAvailable) await fetchQuizList();
          // Fetch exams if not already available
          if (!examResponseAvailable) await fetchExams();
        } catch (err) {
          setError('Error fetching data');  // Set error message if data fetching fails
        } finally {
          setLoading(false);  // Mark the loading state as false once fetching is done
        }
      } else {
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
        <Route path="/signup" element={
          <PasswordProtected>
            <Signup />
          </PasswordProtected>
        } />
      </Routes>
    );
  }

  // Return routes that require authorization, wrapped in Layout component
  return (
    <Layout>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/store" element={<Store />} /> */}
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
  if (loading) return <div><Loader /></div>;

  // If an error occurred during data fetching, show an error message
  if (error) return <div>{error}</div>;

  // Render routes based on the authorization state
  return getRoutes(isAuthorized);
};

export default App;