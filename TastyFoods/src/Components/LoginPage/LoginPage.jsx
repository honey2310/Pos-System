import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserData } from "../../Slices/LoginSlice";

export default function LoginPage({ role }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    role: userRole,
    loading,
    error,
  } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.role === "Manager") {
          navigate("/manager-dashboard", { replace: true });
        } else if (res.payload.role === "Employee") {
          navigate("/employee-dashboard", { replace: true });
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 h-70 md:h-[100vh]">
        <img
          src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=900"
          alt="Burger"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Login Section */}
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-red-500 mb-2 tracking-wide">
          Tasty<span className="text-white">FOODS</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-2">
          Welcome back, <span className="text-red-400">{role || "User"}</span>
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Hey, enter your details to sign in to your account
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email*"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-gray-800 text-gray-200 rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-gray-800 text-gray-200 rounded-full py-3 pl-11 pr-11 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <div
              className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-red-400 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {/* Options */}{" "}
          <div className="flex justify-between items-center text-sm text-gray-400">
            {" "}
            <label className="flex items-center gap-2">
              {" "}
              <input type="checkbox" className="accent-red-500" /> Remember me{" "}
            </label>{" "}
            <a href="#" className="hover:text-red-400 transition">
              {" "}
              Recovery Password{" "}
            </a>{" "}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {/* Switch Account */}{" "}
          <p className="text-center text-gray-400 text-sm mt-4">
            {" "}
            You don’t have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login", { replace: true });
              }}
              className="text-red-400 hover:underline"
            >
              {" "}
              Switch Account{" "}
            </a>{" "}
            now{" "}
          </p>
        </form>
        {/* Footer */}{" "}
        <footer className="mt-10 text-xs text-gray-500 text-center">
          {" "}
          <p>Privacy Policy | Terms of Use</p>{" "}
          <p>
            {" "}
            Copyright © {new Date().getFullYear()} Tasty Foods. All Rights
            Reserved.{" "}
          </p>{" "}
        </footer>
      </div>
    </div>
  );
}
