import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ChatRoom from "./pages/ChatRoom";
// import Login from "./pages/Login";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <div className="mt-[-4rem]">
      <AuthProvider>
        <Navbar />
        {/* <Routes> */}
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route
            path="/chat"
          element={ */}
              <PrivateRoute>
                <ChatRoom />
              </PrivateRoute>
            {/* } */}
          {/* /> */}
        {/* </Routes> */}
      </AuthProvider>
    </div>
  );
}

export default App;
