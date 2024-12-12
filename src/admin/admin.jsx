import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./header";
import Scouts from "./scouts";
import Home from "./home";
import { useAuthContext } from "../firebase/authContext";
import Setting from "./setting/setting";
import Detail from "./detail/detail";
import Group from "./group/group";
import Verify from "./verifyemail";
const Admin = () => {
  const { user, userName, verified, authed } = useAuthContext();
  const place = useLocation();

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  } else {
    return (
      <>
        <Header username={userName} />
        <div className="container" style={{ paddingTop: "4.5rem" }}>
          {verified || place.pathname == "/admin/verify" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scouts" element={<Scouts />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/group/*" element={<Group />} />
              <Route path="/scouts/:id" element={<Detail />} />
              <Route path="/verify" element={<Verify />} />
            </Routes>
          ) : (
            <Navigate to={"/admin/verify"} />
          )}
        </div>
      </>
    );
  }
};

export default Admin;
