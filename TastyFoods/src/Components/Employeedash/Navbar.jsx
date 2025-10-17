// // import React from "react";
// // import { NavLink, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   MdDashboard,
// //   MdFastfood,
// //   MdHistory,
// //   MdAssessment,
// // } from "react-icons/md";
// // import { FaUserAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
// // import { useSelector, useDispatch } from "react-redux";
// // import { logoutUser } from "../../Slices/LoginSlice"; // ✅ import logout

// // export default function EmployeeNavbar() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const dispatch = useDispatch();

// //   // ✅ get current logged-in user from Redux
// //   const { currentUser } = useSelector((state) => state.login);

// //   const linkClass =
// //     "px-5 py-2 text-gray-300 font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]";

// //   const activeClass =
// //     "bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 font-semibold shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-300";

// //   const isEmployeeDashboard = location.pathname === "/employee-dashboard";

// //   return (
// //     <nav className="flex justify-between items-center px-9 py-3 bg-gray-900 backdrop-blur-md border-b border-gray-800 shadow-[0_0_25px_rgba(0,255,150,0.15)] rounded-b-3xl sticky top-0 z-50">
// //       {/* Logo */}
// //       <div className="flex items-center gap-3">
// //         <div className="p-2 bg-red-600 rounded-2xl shadow-[0_0_15px_rgba(255,0,0,0.4)]">
// //           <MdFastfood className="text-white text-2xl" />
// //         </div>
// //         <h1 className="text-2xl font-extrabold tracking-wide text-white">
// //           Tasty<span className="text-green-400">FOODS</span>
// //         </h1>
// //       </div>

// //       {/* NavLinks */}
// //       <div className="flex gap-6">
// //         <NavLink
// //           to="/employee-dashboard"
// //           end
// //           className={({ isActive }) => (isActive ? activeClass : linkClass)}
// //         >
// //           <MdDashboard className="text-lg" /> Dashboard
// //         </NavLink>
// //         <NavLink
// //           to="/employee-order"
// //           className={({ isActive }) => (isActive ? activeClass : linkClass)}
// //         >
// //           <MdFastfood className="text-lg" /> Orders
// //         </NavLink>
// //         <NavLink
// //           to="/employee-history"
// //           className={({ isActive }) => (isActive ? activeClass : linkClass)}
// //         >
// //           <MdHistory className="text-lg" /> History
// //         </NavLink>
// //         <NavLink
// //           to="/employee-reports"
// //           className={({ isActive }) => (isActive ? activeClass : linkClass)}
// //         >
// //           <MdAssessment className="text-lg" /> Reports
// //         </NavLink>
// //         <NavLink
// //           to="/employee-profile"
// //           className={({ isActive }) => (isActive ? activeClass : linkClass)}
// //         >
// //           <FaUserCircle className="text-lg" /> Profile
// //         </NavLink>
// //       </div>

// //       {/* User Info + Logout */}
// //       <div className="flex items-center gap-3 bg-gray-800 px-5 py-2 rounded-full border border-gray-700 transition-all duration-300">
// //         <FaUserAlt className="text-green-400 text-sm" />
// //         {/* ✅ dynamic user name */}
// //         <span className="text-sm font-medium text-gray-200">
// //           {currentUser?.name || "Employee"}
// //         </span>
// //         {isEmployeeDashboard && (
// //           <button
// //             onClick={() => {
// //               dispatch(logoutUser()); // ✅ clear Redux state
// //               navigate("/login", { replace: true });
// //             }}
// //             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:shadow-[0_0_15px_rgba(0,255,150,0.5)] transition-all duration-300"
// //           >
// //             <FaSignOutAlt />
// //             Logout
// //           </button>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// import React from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   MdDashboard,
//   MdFastfood,
//   MdHistory,
//   MdAssessment,
// } from "react-icons/md";
// import { FaUserAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../../Slices/LoginSlice";

// export default function EmployeeNavbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const { currentUser } = useSelector((state) => state.login);

//   const linkClass =
//     "px-5 py-2 text-[#04040b] font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[#ae8c72] hover:text-white hover:shadow-[0_0_10px_rgba(174,140,114,0.3)]";

//   const activeClass =
//     "bg-[#ae8c72] text-white px-5 py-2 rounded-full flex items-center gap-2 font-semibold shadow-[0_0_15px_rgba(174,140,114,0.5)] transition-all duration-300";

//   const isEmployeeDashboard = location.pathname === "/employee-dashboard";

//   return (
//     <nav className="flex justify-between items-center px-9 py-3 bg-[#f7f0fd] backdrop-blur-md border-b border-[#ae8c72] shadow-[0_0_25px_rgba(4,4,11,0.15)] rounded-b-3xl sticky top-0 z-50">
//       {/* Logo */}
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-[#dfc9b8] rounded-2xl shadow-[0_0_15px_rgba(223,201,184,0.4)]">
//           <MdFastfood className="text-[#04040b] text-2xl" />
//         </div>
//         <h1 className="text-2xl font-extrabold tracking-wide text-[#04040b]">
//           Tasty<span className="text-[#ae8c72]">FOODS</span>
//         </h1>
//       </div>

//       {/* NavLinks */}
//       <div className="flex gap-6">
//         <NavLink
//           to="/employee-dashboard"
//           end
//           className={({ isActive }) => (isActive ? activeClass : linkClass)}
//         >
//           <MdDashboard className="text-lg" /> Dashboard
//         </NavLink>
//         <NavLink
//           to="/employee-order"
//           className={({ isActive }) => (isActive ? activeClass : linkClass)}
//         >
//           <MdFastfood className="text-lg" /> Orders
//         </NavLink>
//         <NavLink
//           to="/employee-history"
//           className={({ isActive }) => (isActive ? activeClass : linkClass)}
//         >
//           <MdHistory className="text-lg" /> History
//         </NavLink>
//         <NavLink
//           to="/employee-reports"
//           className={({ isActive }) => (isActive ? activeClass : linkClass)}
//         >
//           <MdAssessment className="text-lg" /> Reports
//         </NavLink>
//         <NavLink
//           to="/employee-profile"
//           className={({ isActive }) => (isActive ? activeClass : linkClass)}
//         >
//           <FaUserCircle className="text-lg" /> Profile
//         </NavLink>
//       </div>

//       {/* User Info + Logout */}
//       <div className="flex items-center gap-3 bg-[#dfc9b8] px-5 py-2 rounded-full border border-[#ae8c72] transition-all duration-300">
//         <FaUserAlt className="text-[#04040b] text-sm" />
//         <span className="text-sm font-medium text-[#04040b]">
//           {currentUser?.name || "Employee"}
//         </span>
//         {isEmployeeDashboard && (
//           <button
//             onClick={() => {
//               dispatch(logoutUser());
//               navigate("/login", { replace: true });
//             }}
//             className="flex items-center gap-2 bg-[#ae8c72] hover:bg-[#dfc9b8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-[0_0_10px_rgba(174,140,114,0.4)] hover:shadow-[0_0_15px_rgba(4,4,11,0.5)] transition-all duration-300"
//           >
//             <FaSignOutAlt />
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdFastfood,
  MdHistory,
  MdAssessment,
} from "react-icons/md";
import { FaUserAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Slices/LoginSlice";

export default function EmployeeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.login);

  const linkClass =
    "px-5 py-2 text-[#04040b] font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-[#ae8c72] hover:text-white hover:shadow-[0_0_10px_rgba(174,140,114,0.3)]";

  const activeClass =
    "bg-[#ae8c72] text-white px-5 py-2 rounded-full flex items-center gap-2 font-semibold shadow-[0_0_15px_rgba(174,140,114,0.5)] transition-all duration-300";

  const isEmployeeDashboard = location.pathname === "/employee-dashboard";

  return (
    <nav className="flex justify-between items-center px-9 py-3 bg-[#f7f0fd] backdrop-blur-md border-b border-[#ae8c72] shadow-[0_0_25px_rgba(4,4,11,0.15)] rounded-b-3xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#dfc9b8] rounded-2xl shadow-[0_0_15px_rgba(223,201,184,0.4)]">
          <MdFastfood className="text-[#04040b] text-2xl" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide text-[#04040b]">
          Tasty<span className="text-[#ae8c72]">FOODS</span>
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
        <NavLink
          to="/employee-profile"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          <FaUserCircle className="text-lg" /> Profile
        </NavLink>
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center gap-3 bg-[#dfc9b8] px-5 py-2 rounded-full border border-[#ae8c72] transition-all duration-300">
        <FaUserAlt className="text-[#04040b] text-sm" />
        <span className="text-sm font-medium text-[#04040b]">
          {currentUser?.name || "Employee"}
        </span>
        {isEmployeeDashboard && (
          <button
            onClick={() => {
              dispatch(logoutUser());
              navigate("/login", { replace: true });
            }}
            className="flex items-center gap-2 bg-[#ae8c72] hover:bg-[#dfc9b8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-[0_0_10px_rgba(174,140,114,0.4)] hover:shadow-[0_0_15px_rgba(4,4,11,0.5)] transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}


