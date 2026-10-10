import React from "react";
import { NavLink } from "react-router-dom";
import {
  BriefcaseBusiness,
  PlusCircle,
   LogOut,
  PanelLeftClose,
} from "lucide-react";

const menuItems = [

  {
    name: "Create Job",
    path: "/create-job",
    icon: PlusCircle,
  },
  {
    name: "All Jobs",
    path: "/getAll-job",
    icon: BriefcaseBusiness,
  },

];

 const Sidebar=({setToken}) =>{
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Brand */}
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <BriefcaseBusiness size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              HireHub
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Admin Panel
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Sidebar"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <PanelLeftClose size={19} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.3 : 1.8}
                      className={
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-700"
                      }
                    />

                    <span className="flex-1">{item.name}</span>

                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Settings */}
        <p className="mb-3 mt-9 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Preferences
        </p>
       


<button
  type="button"
  onClick={()=>{
    setToken("");
      localStorage.removeItem("token");
       navigate("/login");
  }}
  className="inline-flex items-center justify-center gap-2
    rounded-xl bg-blue-600 px-5 py-2.5
    text-sm font-semibold text-white shadow-sm
    transition-all duration-200
    hover:bg-blue-700 hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:ring-offset-2 active:scale-95"
>
  <LogOut size={17} />
  Logout
</button>

      
      </div>

     
    </aside>
  );
}
export default Sidebar
