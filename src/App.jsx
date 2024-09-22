import { useState } from "react";
import { Route, Routes } from "react-router";
import Land from "./pages/Land";
import Admin from "./admin/admin";
import Help from "./pages/help/help";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/help/*" element={<Help />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
