import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import { app } from "../firebase";

const Admin = () => {
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<h1>Admin Panel</h1>} />
          <Route path="/scouts" element={<h1>Scouts Management</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
