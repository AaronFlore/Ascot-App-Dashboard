import logo from "./logo.svg";
import "./App.css";
import AdminPage from "./components/AdminPage";
import LoginPortal from "./components/LoginPortal";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  return !user ? <LoginPortal user={user} setUser={setUser} /> : <AdminPage />;
}

export default App;
