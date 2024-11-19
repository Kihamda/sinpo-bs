import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import Scouts from "./scouts";
import Home from "./home";
import { useAuthContext } from "../firebase/authContext";
import Setting from "./setting/setting";
import Detail from "./detail/detail";
import Group from "./group/group";
import Verify from "./verifyemail";
const Admin = () => {
  const { user, userName, verified } = useAuthContext();

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  } else {
    return (
      <>
        <Header username={userName} />
        <div className="container" style={{ paddingTop: "4.5rem" }}>
          {verified ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scouts" element={<Scouts />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/group/*" element={<Group />} />
              <Route path="/scouts/:id" element={<Detail />} />
            </Routes>
          ) : (
            <Verify />
          )}
        </div>
      </>
    );
  }
};

export default Admin;
