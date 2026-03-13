import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaThLarge, FaPlusCircle, FaPlusSquare, FaUserCircle } from "react-icons/fa";

const DashboardPannel = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.user?.role;
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 font-bold text-sm tracking-widest uppercase italic ${
        isActive(to)
          ? "bg-indigo-500 text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
          : "text-slate-500 hover:text-indigo-400 hover:bg-white/5"
      }`}
    >
      <Icon className={`text-lg transition-transform duration-300 ${isActive(to) ? "scale-110" : "group-hover:scale-110"}`} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="glass-panel rounded-[2.5rem] border border-white/5 p-4 mb-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 px-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <FaThLarge className="text-indigo-400" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">
              {role === "Admin" ? "Admin Command" : "Command Center"}
            </h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Management Console</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2">
          {role === "Admin" ? (
            <>
              <NavLink to="/dashboard" icon={FaUserCircle} label="Profile" />
              <NavLink to="/dashboard/create-category" icon={FaPlusCircle} label="Categories" />
              <NavLink to="/dashboard/create-product" icon={FaPlusSquare} label="Products" />
            </>
          ) : (
            <>
              <NavLink to="/dashboard" icon={FaUserCircle} label="Your Profile" />
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default DashboardPannel;
