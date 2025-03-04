import { useState } from "react";
import Button from "./Button";
import Alert from '../utils/Snackbar'

const PRESET_PASSWORD = "3ZXM-4RFO-J7M3-2XMQ";

const PasswordProtected = ({ children }) => {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === PRESET_PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {error && <Alert severity={5} title="Error" detail={error} />}
      <div className="form">
        <h1>Enter Access Key</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtected;