//dependencies
import { useEffect, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//components
import Quiz from './containers/Quiz'
import QuizList from './containers/QuizList'
import Exam from './containers/Exam'
import ExamList from './containers/ExamList'
import Login from './components/Login'
import { PasswordProtected as Signup } from './components/Signup'
import Logout from './components/Logout'
import Layout from './layouts/Layout'
// import QuizCreator from './containers/QuizCreator'
import TestResult from './containers/TestResult'
import Result from './containers/Result.jsx'
import Loader from './utils/Loader.jsx'

//apps
import HomePage from './containers/HomePage/App';
import Logbook from './containers/Logbook/App'
import RentPlanes from './containers/RentPlanes/RentPlanes'
import Worldchat from './containers/WorldChat/App'
import Devchat from './containers/DevChat/App'

//contexts
import { useAuth } from './contexts/AuthContext'
import { useQuiz } from './contexts/QuizContext'
import { useExam } from './contexts/ExamContext'

const PasswordProtected = ({ correctPassword, children }) => {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  return accessGranted ? (
    children
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-900 text-white">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 text-black rounded"
        placeholder="Enter password"
      />
      <button
        onClick={() => setAccessGranted(password === correctPassword)}
        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
      >
        Submit
      </button>
    </div>
  );
};

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
          <PasswordProtected correctPassword={"3ZXM-4RFO-J7M3"}>
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
        {/* <Route path="/quiz-creator" element={<QuizCreator />} /> */}
        <Route path="/testresult" element={<TestResult />} />
        <Route path="/worldchat" element={<Worldchat />} />
        <Route path="/devchat" element={<Devchat />} />
        <Route path="/quizList" element={<QuizList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/rentaplane" element={<RentPlanes />} />
        <Route path="/logbook" element={<Logbook />} />
        <Route path="/quiz/:course/:id" element={<Quiz />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  // Extract values from the context
  // const { authToken, response, ExamResponse, autoLogin, fetchQuizList, fetchExams } = useContextPilotPass();

  const { authToken, autoLogin } = useAuth()
  const { response, fetchQuizList } = useQuiz()
  const { ExamResponse, fetchExams } = useExam()

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
  // if (error) return <div>{error}</div>;

  // Render routes based on the authorization state
  return getRoutes(isAuthorized);
};

export default App;