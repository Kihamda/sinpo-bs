import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Viewer from "./viewer";
import { useAuthContext } from "../firebase/authContext";

const Auth = () => {
  const { user } = useAuthContext();
  if (user) {
    return <Navigate to={"/admin"} />;
  } else {
    return (
      <div className="d-grid vh-100 justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/viewer" element={<Viewer />} />
          </Routes>
        </div>
      </div>
    );
  }
};

export default Auth;
