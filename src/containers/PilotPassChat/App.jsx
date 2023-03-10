import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <div className="container mt-[-4rem]">
      <AuthProvider>
        <Navbar className="" />
        {/* <PrivateRoute> */}
          <ChatRoom />
        {/* </PrivateRoute> */}
      </AuthProvider>
    </div>
  );
}

export default App;
