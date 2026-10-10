import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserHome from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ApplyJob from "./components/ApplyJob";
import About from "./components/About";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/" replace /> : <Login setToken={setToken} />
        }
      />

      {/* Signup Page */}
      <Route
        path="/signup"
        element={token ? <Navigate to="/" replace /> : <SignUp />}
      />

      {/* Protected Home Page */}
      <Route
        path="/"
        element={
          token ? (
            <UserHome token={token} setToken={setToken} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected Apply Job Page */}
      <Route
        path="/jobs/:jobId"
        element={
          token ? <ApplyJob token={token} /> : <Navigate to="/login" replace />
        }
      />
      {/* Protected Apply Job Page */}
      <Route path="/about" element={<About />} />

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
