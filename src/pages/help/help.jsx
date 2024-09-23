import { Route, Routes } from "react-router-dom";
import Contact from "./contact";

const Help = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Help Page</h1>} />
      <Route path="/:id" element={<h1>article</h1>} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default Help;
