import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import Scouts from "./scouts";
import Home from "./home";
import { useAuthContext } from "../firebase/authContext";
import Share from "./share";
import Detail from "./detail";
const Admin = () => {
  const { user, userName } = useAuthContext();

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  } else {
    return (
      <>
        <Header username={userName} />
        <div className="container min-vh-100" style={{ paddingTop: "4.5rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scouts" element={<Scouts />} />
            <Route path="/share/*" element={<Share />} />
            <Route path="/scouts/:id" element={<Detail />} />
          </Routes>
        </div>
      </>
    );
  }
};

export default Admin;
