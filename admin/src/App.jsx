// import { useState ,useEffect} from "react";

// import AdminLogin from "../src/components/AdminLogin"
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Route,Routes } from "react-router-dom";
// import CreateJob from "./pages/CreateJob";
// import GetAllJobs from "./pages/GetAllJobs";
// import DeleteJob from "./pages/DeleteJob";
// export const backendUrl = import.meta.env.VITE_BACKEND_URL;
// function App(){
//   const [token,setToken] = useState(localStorage.getItem("token") || "")

// useEffect(() => {
//     localStorage.setItem("token", token);
//   }, [token]);

//   if(!token){
//    return <AdminLogin setToken={setToken} />;
//   }
  
//   return(
//     <>
//    <div className="flex ">
//      <Sidebar setToken={setToken}/>
//     <Navbar/>
//     <div>
//        <Routes>
       
//            <Route path="/create-job" element={<CreateJob token ={token}/>} />
//            <Route path="/getAll-job" element={<GetAllJobs token ={token} />} />
//            <Route path="/delete-job" element={<DeleteJob token={token} />} />
//          </Routes>
//     </div>
//    </div>
   
//     </>
//   )
  
// }
// export default App


import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreateJob from "./pages/CreateJob";
import GetAllJobs from "./pages/GetAllJobs";
import DeleteJob from "./pages/DeleteJob";
import AllAplicationFetch from "../src/components/AllAplicationFetch"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          OVERVIEW
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Welcome back! Manage your job portal from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Job Management
          </p>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Manage Jobs
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create new job postings, view existing jobs, and manage
            listings from your dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Create
          </p>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Publish a Job
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add job details and publish opportunities for candidates.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-2 xl:col-span-1">
          <p className="text-sm font-medium text-slate-500">
            Organization
          </p>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            HireHub Admin
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Keep your job listings organized and up to date.
          </p>
        </div>
      </div>
    </div>
  );
}

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
          {/* Top navbar */}
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <Navbar setToken={setToken} />
          </header>

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
                path="/delete-job"
                element={<DeleteJob token={token} />}
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