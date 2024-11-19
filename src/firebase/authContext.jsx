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
  const [relid, setRelid] = useState("");
  const [orgid, setOrgid] = useState("");
  const [role, setRole] = useState("");
  const [verified, setVerified] = useState(false);

  const value = {
    user,
    userName,
    loading,
    relid,
    orgid,
    role,
    verified,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((suser) => {
      if (suser) {
        getDoc(doc(db, "users", suser.uid)).then((auser) => {
          setUserName(auser.data().name);
          setRelid(auser.data().group.relid);
          setOrgid(auser.data().group.orgid);
          setVerified(auth.currentUser.emailVerified);
          getDoc(
            doc(
              db,
              "groups",
              auser.data().group.orgid,
              "members",
              auser.data().group.relid
            )
          ).then((buser) => {
            setRole(buser.data().role);
            setUser(suser);
            setLoading(false);
          });
        });
      } else {
        setUser(suser);
        setLoading(false);
      }
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
