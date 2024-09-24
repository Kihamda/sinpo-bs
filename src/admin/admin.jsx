import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import Scouts from "./scouts";
import Home from "./home";
import { useAuthContext } from "../firebase/authContext";
import Share from "./share";
const Admin = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  } else {
    return (
      <>
        <Header />
        <div className="container vh-100" style={{ paddingTop: "4.5rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scouts" element={<Scouts />} />
            <Route path="/share" element={<Share />} />
          </Routes>
        </div>
      </>
    );
  }
};

export default Admin;
