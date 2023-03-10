import { createContext, useState, useContext, useEffect } from "react"
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { auth } from '../../../firebase/firebase'
import { useSelector } from "react-redux";

// create context
const AuthContext = createContext();
// Provider Context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const currentUser = useSelector(state => state.user.name)
  const [loading, setLoading] = useState(true);

  // signin with google
  // const signinWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithRedirect(auth, provider)
  // }

  // signout
  // const logout = () => signOut(auth);

  const value = {
    currentUser,
    setCurrentUser,
    // logout
  }

  // set currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}