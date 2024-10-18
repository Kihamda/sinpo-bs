import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    userName,
    loading,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      getDoc(doc(db, "users", user.uid)).then((auser) => {
        setUserName(auser.data().name);
      });
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-content-center flex-column">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <h5 className="mt-3 text-center">Loading</h5>
      </div>
    );
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
}
