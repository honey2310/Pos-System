import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserData } from "../../Slices/LoginSlice";
import { useAuth } from "../../Components/context/AuthContext";

export default function ManagerLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const { currentUser, role, loading, error } = useSelector(
    (state) => state.login
  );

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!loading && currentUser && role === "Manager") {
      login(currentUser, "manager");
      navigate("/manager-dashboard", { replace: true });
    }
  }, [currentUser, role, loading, login, navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const userRole = res.payload.role;
        if (userRole === "Manager") {
          login(res.payload, "manager");
          navigate("/manager-dashboard", { replace: true });
        } else {
          alert("Invalid credentials: This is not a Manager account!");
        }
      }
    });
  };
  
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-70 md:h-[100vh]">
        <img
          src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=900"
          alt="Burger"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Login Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden bg-gradient-to-br from-[#f7f0fd]/70 via-[#dfc9b8]/50 to-[#ae8c72]/40">
        <h1 className="text-4xl font-extrabold text-black mb-2 tracking-wide">
          Tasty<span className="text-[#ae8c72]">FOODS</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-2">
          Welcome back, <span className="text-[#ae8c72]">Manager</span>
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
              className="w-full bg-white-800 text-black-200 border-2 border-[#ae8c72] rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ae8c72]"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4.5 top-4.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-white-800 text-black-200 border-2 border-[#ae8c72] rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ae8c72]"
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
          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#ae8c72]" /> Remember me
            </label>
            <a href="#" className="hover:text-[#ae8c72] transition">
              Recovery Password
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ae8c72] hover:bg-[#ae8c72] text-black font-semibold py-3 rounded-full transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-[#4b4b4b] text-sm mt-4">
            You don’t have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login", { replace: true });
              }}
              className="text-[#ae8c72] hover:underline"
            >
              Switch Account
            </a>{" "}
            now
          </p>
        </form>
        <footer className="mt-10 text-xs text-gray-500 text-center">
          Copyright © {new Date().getFullYear()} Tasty Foods. All Rights
          Reserved.
        </footer>
      </div>
    </div>
  );
}
