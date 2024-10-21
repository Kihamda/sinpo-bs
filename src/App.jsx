import { Route, Routes, useLocation } from "react-router";
import Top from "./pages/Land";
import Admin from "./admin/admin";
import Help from "./pages/help/help";
import { AuthProvider } from "./firebase/authContext";

import { useEffect, useState } from "react";
function App() {
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
    <>
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
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<Top />} />
              <Route path="/help/*" element={<Help />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </>
  );
}

export default App;
