import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdFastfood,
  MdHistory,
  MdAssessment,
} from "react-icons/md";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Tuple } from "@reduxjs/toolkit";

export default function EmployeeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass =
    "px-5 py-2 text-gray-300 font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]";

  const activeClass =
    "bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 font-semibold shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-300";

  const isEmployeeDashboard = location.pathname === "/employee-dashboard";

  return (
    <nav className="flex justify-between items-center px-9 py-3 bg-gray-900 backdrop-blur-md border-b border-gray-800 shadow-[0_0_25px_rgba(0,255,150,0.15)] rounded-b-3xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-600 rounded-2xl shadow-[0_0_15px_rgba(255,0,0,0.4)]">
          <MdFastfood className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide text-white">
          Tasty
          <span className="text-green-400">FOODS</span>
        </h1>
      </div>

      {/* NavLinks */}
      <div className="flex gap-6">
        <NavLink
          to="/employee-dashboard"
          end
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdDashboard className="text-lg" /> Dashboard
        </NavLink>
        <NavLink
          to="/employee-order"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdFastfood className="text-lg" /> Orders
        </NavLink>
        <NavLink
          to="/employee-history"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdHistory className="text-lg" /> History
        </NavLink>
        <NavLink
          to="/employee-reports"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <MdAssessment className="text-lg" /> Reports
        </NavLink>
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center gap-3 bg-gray-800 px-5 py-2 rounded-full border border-gray-700 transition-all duration-300">
        <FaUserAlt className="text-green-400 text-sm" />
        <span className="text-sm font-medium text-gray-200">Khushboo</span>
        {isEmployeeDashboard && (
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:shadow-[0_0_15px_rgba(0,255,150,0.5)] transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
