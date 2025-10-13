import React from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";
import "./LoginSelector.css";
import { useNavigate } from "react-router-dom";

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background Image Overlay */}
      <img
        src="https://images.unsplash.com/photo-1600891963939-c9b6feaa4f93?auto=format&fit=crop&w=1600&q=80"
        alt="Restaurant background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

      {/* Decorative Glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-500 opacity-30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 opacity-20 blur-3xl rounded-full" />

      {/* Header */}
      <header className="text-center mb-12 z-10">
        <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-lg tracking-wide">
          Tasty<span className="text-yellow-400">FOODS</span>
        </h1>
        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Choose your login type to continue
        </p>
      </header>

      {/* Login Role Boxes */}
      <div className="flex flex-col md:flex-row gap-8 z-10">
        {/* Manager Box */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-red-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
          <div className="absolute top-3 right-3 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          <div className="bg-red-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FaUserTie className="text-5xl text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Manager</h2>
          <p className="text-gray-400 mb-6">
            Access admin features and manage operations.
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition"
            onClick={() => navigate("/manager-login", { replace: true })}
          >
            Login as Manager
          </button>
        </div>

        {/* Employee Box */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-green-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
          <div className="absolute top-3 right-3 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
          <div className="bg-green-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FaUsers className="text-5xl text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Employee</h2>
          <p className="text-gray-400 mb-6">
            Log in to view tasks, orders, and schedule.
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition"
            onClick={() => navigate("/employee-login", { replace: true })}
          >
            Login as Employee
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs text-gray-500 text-center z-10">
        <p>© {new Date().getFullYear()} TastyFoods. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
