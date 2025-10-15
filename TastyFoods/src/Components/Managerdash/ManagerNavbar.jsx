import React from "react";
import { useNavigate, useLocation, replace } from "react-router-dom";
import {
  MdDashboard,
  MdPendingActions,
  MdFastfood,
  MdPeopleAlt,
  MdAssessment,
  MdOutlinePerson,
} from "react-icons/md";
import { FaUsersCog, FaSignOutAlt } from "react-icons/fa";

export default function ManagerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const baseLink =
    "flex items-center gap-2 px-4 py-2 rounded-xl text-gray-300 font-medium transition-all duration-300";
  const inactiveLink =
    baseLink +
    " hover:bg-green-500/10 hover:text-green-400 hover:scale-[1.05]";
  const activeLink =
    baseLink +
    " bg-green-600/20 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.4)] scale-[1.07]";

  // ✅ Get manager info from localStorage
  const manager = JSON.parse(localStorage.getItem("managerUser")) || {};
  const managerName = manager.name || "Manager";

  const navItems = [
    { label: "Dashboard", icon: <MdDashboard />, path: "/manager-dashboard" },
    { label: "Pending", icon: <MdPendingActions />, path: "/manager-pendingorders" },
    { label: "Products", icon: <MdFastfood />, path: "/products",replace: true },
    { label: "Customers", icon: <MdPeopleAlt />, path: "/manager-customers",},
    { label: "Employees", icon: <FaUsersCog />, path: "/manager-employeesdetails" },
    { label: "Reports", icon: <MdAssessment />, path: "/manager-reports"},
  ];

  const handleNavClick = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* === Restaurant Header === */}
      <div className="bg-black/80 border-b border-green-600/40 px-8 py-3 flex items-center justify-between shadow-[0_4px_20px_rgba(0,255,100,0.15)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <MdFastfood className="text-green-400 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Tasty<span className="text-green-400">Foods</span>
          </h1>
        </div>

        <div className="text-gray-400 text-sm font-medium">
          📅 {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </div>
      </div>

      {/* === Navigation Bar === */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
          {/* === Center: Navigation Links === */}
          <div className="flex items-center gap-6">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.path)}
                className={
                  location.pathname === item.path ? activeLink : inactiveLink
                }
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {/* === Right: Profile + Logout === */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MdOutlinePerson className="text-green-400 text-lg" />
              <span className="text-gray-200 text-sm font-medium">Rahul Mehta</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("managerUser"); // clear manager info on logout
                navigate("/login", { replace: true });
              }}
              className="flex items-center gap-2 bg-green-500/20 border border-green-500/50 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-xl text-sm font-semibold hover:scale-[1.05] shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
