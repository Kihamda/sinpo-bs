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
        <div className="container vh-100" style={{ paddingTop: "4.5rem" }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scouts" element={<Scouts />} />
                <Route path="/share/*" element={<Share />} />
                <Route path="/detail/*" element={<Detail />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Admin;
