import { Route, Routes } from "react-router";
import Top from "./pages/Land";
import Admin from "./admin/admin";
import Help from "./pages/help/help";
import { AuthProvider } from "./firebase/authContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Top />} />
          <Route path="/help/*" element={<Help />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
