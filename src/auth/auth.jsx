import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import { useAuthContext } from "../firebase/authContext";
import Reset from "./reset";

const Auth = () => {
  const { user } = useAuthContext();
  const isNewReg = useLocation();

  if (user && !(isNewReg.pathname == "/auth/signup")) {
    return <Navigate to={"/admin"} />;
  } else {
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center flex-column"
        id="forms"
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </Routes>
        <Link className="text-center" to="/">
          最初の画面に戻る
        </Link>
        <style>
          {`
            #forms * {
              width: 100%;
            }
              #forms h1 {
              text-align: center;
            }
          `}
        </style>
      </div>
    );
  }
};

export default Auth;
