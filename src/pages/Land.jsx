import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import Auth from "../auth/auth";

const Land = () => {
  return (
    <div className="justify-content-center d-flex flex-column text-center">
      <h1 className="mb-0 pt-0">My History</h1>
      <span className="mb-5">of Scouting</span>
      <p>ボーイスカウト吹田9団専用システム</p>
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
      className="vw-100 vh-100 justify-content-center "
      style={{
        backgroundImage: "url(/bg.webp)",
        backgroundSize: "cover",
      }}
    >
      <div
        className="vh-100 d-flex flex-wrap justify-content-center align-content-center "
        style={{
          backdropFilter: `blur(${blur}px)`,
          transition: "ease-in-out 1s",
          transitionProperty: "backdrop-filter",
        }}
      >
        <div
          className="row justify-content-center w-100"
          style={{ minHeight: "75%" }}
        >
          <div className="col-12 col-lg-6 col-md-8 col-xxl-4 container d-flex flex-wrap justify-content-center align-content-center">
            <div className="card w-100 h-100">
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
