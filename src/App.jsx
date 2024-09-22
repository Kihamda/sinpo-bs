import { Route, Routes } from "react-router";
import Land from "./pages/Land";
import Admin from "./admin/admin";
import Help from "./pages/help";
import Auth from "./auth/auth";
import { AuthProvider } from "./firebase/authContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/help/*" element={<Help />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
