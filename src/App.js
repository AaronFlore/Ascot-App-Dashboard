import "./App.css";
import AdminPage from "./components/AdminPage";
import LoginPortal from "./components/LoginPortal";
import ForgotPassword from "./components/ForgotPassword"; // This will be your new component for password reset
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPortal user={user} setUser={setUser} />
            ) : (
              <AdminPage user={user} setUser={setUser} />
            )
          }
        />
        {/* <Route path="/forgot" element={<ForgotPassword />} /> */}
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
