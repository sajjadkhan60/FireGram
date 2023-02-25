import "./App.css";
import LoginPage from "./pages/login_page/login.page";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup_page/signup.page";
import { useState } from "react";
import Dashboard from "./pages/dashboard_page/dashboard.page";
import Profile from "./pages/profile_page/profile";
import Post from "./pages/post_page/Post";

function App() {
  const [registerd, setRegisterd] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage registerd={registerd} setRegisterd={setRegisterd} />
          }
        />
        <Route
          path="/signup"
          element={<SignupPage setRegisterd={setRegisterd} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard userEmail={userEmail} />}
        />
        <Route path="/profile" element={<Profile userEmail={userEmail} />} />
        <Route path="/post/:p_id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
