import { useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/header";
import Home from "./pages/Home";
import Scouts from "./pages/scouts";
function App() {
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scouts" element={<Scouts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
