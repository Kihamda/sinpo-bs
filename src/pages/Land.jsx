import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";

import Auth from "../auth/auth";

import { useEffect, useState } from "react";
const Land = () => {
  return (
    <div className="justify-content-center d-flex flex-column text-center">
      <h1 className="mb-0 pt-0">My History</h1>
      <span className="mb-5">from My History of Scouting プロジェクト</span>
      <p>
        <Link to="/help/contact">連絡はこちらまで</Link>
      </p>
      <div className="d-flex justify-content-center">
        <Link to={"/auth/login"} className="btn btn-primary">
          ログイン
        </Link>
      </div>
    </div>
  );
};

const Top = () => {
  const locate = useLocation();
  const [blur, setBlur] = useState(10);
  useEffect(() => {
    if (locate.pathname == "/") {
      setBlur(0);
    } else {
      setBlur(10);
    }
  }, [locate]);
  return (
    <div
      className="min-vh-100 justify-content-center"
      style={{
        backgroundImage: "url(/bg.webp)",
        backgroundSize: "cover",
      }}
    >
      <div
        className="min-vh-100 d-flex flex-wrap justify-content-center"
        style={{
          backdropFilter: `blur(${blur}px)`,
          transition: "ease-in-out 1s",
          transitionProperty: "backdrop-filter",
        }}
      >
        <div className="row justify-content-center w-100">
          <div className="col-12 col-lg-6 col-md-8 col-xxl-4 container d-flex flex-wrap justify-content-center align-content-center mt-auto mb-auto">
            <div
              className="card w-100 h-100 pt-5 pb-5"
              style={{ minHeight: "65vh" }}
            >
              <div className="card-body d-flex flex-wrap justify-content-center align-content-center">
                <Routes>
                  <Route path="/" element={<Land />} />
                  <Route path="/auth/*" element={<Auth />} />
                  <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Top;
