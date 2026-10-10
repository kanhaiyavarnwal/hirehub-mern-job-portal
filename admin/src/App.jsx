


import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";

import Sidebar from "./components/Sidebar";
import CreateJob from "./pages/CreateJob";
import GetAllJobs from "./pages/GetAllJobs";

import AllAplicationFetch from "../src/components/AllAplicationFetch"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;


function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  if (!token) {
    return <AdminLogin setToken={setToken} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar setToken={setToken} />

        {/* Main application area */}
        <div className="flex min-w-0 flex-1 flex-col">
        

          {/* Page content */}
          <main className="min-w-0 flex-1 overflow-x-hidden">
            <Routes>
            

              <Route
                path="/create-job"
                element={<CreateJob token={token} />}
              />

              <Route
                path="/getAll-job"
                element={<GetAllJobs token={token} />}
              />

            
              <Route
                path="/admin/jobs/:id"
                element={<AllAplicationFetch token={token}/>}
              />

              
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white px-4 py-4 text-center text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} HireHub Admin Panel. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;