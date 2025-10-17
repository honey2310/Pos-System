// // import React from "react";
// // import { FaUserTie, FaUsers } from "react-icons/fa";
// // import "./LoginSelector.css";
// // import { useNavigate } from "react-router-dom";

// // export default function LoginSelector() {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
// //       {/* Background Image Overlay */}
// //       <img
// //         src="https://images.unsplash.com/photo-1600891963939-c9b6feaa4f93?auto=format&fit=crop&w=1600&q=80"
// //         alt="Restaurant background"
// //         className="absolute inset-0 w-full h-full object-cover opacity-20"
// //       />
// //       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

// //       {/* Decorative Glow */}
// //       <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-500 opacity-30 blur-3xl rounded-full" />
// //       <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 opacity-20 blur-3xl rounded-full" />

// //       {/* Header */}
// //       <header className="text-center mb-12 z-10">
// //         <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-lg tracking-wide">
// //           Tasty<span className="text-yellow-400">FOODS</span>
// //         </h1>
// //         <p className="text-gray-300 mt-2 text-sm md:text-base">
// //           Choose your login type to continue
// //         </p>
// //       </header>

// //       {/* Login Role Boxes */}
// //       <div className="flex flex-col md:flex-row gap-8 z-10">
// //         {/* Manager Box */}
// //         <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-red-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
// //           <div className="absolute top-3 right-3 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
// //           <div className="bg-red-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
// //             <FaUserTie className="text-5xl text-red-400" />
// //           </div>
// //           <h2 className="text-2xl font-semibold text-white mb-2">Manager</h2>
// //           <p className="text-gray-400 mb-6">
// //             Access admin features and manage operations.
// //           </p>
// //           <button
// //             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition"
// //             onClick={() => navigate("/manager-login", { replace: true })}
// //           >
// //             Login as Manager
// //           </button>
// //         </div>

// //         {/* Employee Box */}
// //         <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-green-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
// //           <div className="absolute top-3 right-3 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
// //           <div className="bg-green-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
// //             <FaUsers className="text-5xl text-green-400" />
// //           </div>
// //           <h2 className="text-2xl font-semibold text-white mb-2">Employee</h2>
// //           <p className="text-gray-400 mb-6">
// //             Log in to view tasks, orders, and schedule.
// //           </p>
// //           <button
// //             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition"
// //             onClick={() => navigate("/employee-login", { replace: true })}
// //           >
// //             Login as Employee
// //           </button>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="mt-12 text-xs text-gray-500 text-center z-10">
// //         <p>© {new Date().getFullYear()} TastyFoods. All Rights Reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // }


// import React from "react";
// import { FaUserTie, FaUsers } from "react-icons/fa";
// import "./LoginSelector.css";
// import { useNavigate } from "react-router-dom";

// export default function LoginSelector() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
//       {/* Background Image Overlay */}
//       <img
//         src="https://images.unsplash.com/photo-1600891963939-c9b6feaa4f93?auto=format&fit=crop&w=1600&q=80"
//         alt="Restaurant background"
//         className="absolute inset-0 w-full h-full object-cover opacity-20"
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

//       {/* Decorative Glow */}
//       <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-500 opacity-30 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 opacity-20 blur-3xl rounded-full" />

//       {/* Header */}
//       <header className="text-center mb-12 z-10">
//         <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-lg tracking-wide">
//           Tasty<span className="text-yellow-400">FOODS</span>
//         </h1>
//         <p className="text-gray-300 mt-2 text-sm md:text-base">
//           Choose your login type to continue
//         </p>
//       </header>

//       {/* Login Role Boxes */}
//       <div className="flex flex-col md:flex-row gap-8 z-10">
//         {/* Manager Box */}
//         <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-red-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
//           <div className="absolute top-3 right-3 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
//           <div className="bg-red-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//             <FaUserTie className="text-5xl text-red-400" />
//           </div>
//           <h2 className="text-2xl font-semibold text-white mb-2">Manager</h2>
//           <p className="text-gray-400 mb-6">
//             Access admin features and manage operations.
//           </p>
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition"
//             onClick={() => navigate("/manager-login", { replace: true })}
//           >
//             Login as Manager
//           </button>
//         </div>

//         {/* Employee Box */}
//         <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-green-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
//           <div className="absolute top-3 right-3 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
//           <div className="bg-green-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//             <FaUsers className="text-5xl text-green-400" />
//           </div>
//           <h2 className="text-2xl font-semibold text-white mb-2">Employee</h2>
//           <p className="text-gray-400 mb-6">
//             Log in to view tasks, orders, and schedule.
//           </p>
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition"
//             onClick={() => navigate("/employee-login", { replace: true })}
//           >
//             Login as Employee
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 text-xs text-gray-500 text-center z-10">
//         <p>© {new Date().getFullYear()} TastyFoods. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      {/* <img
        src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=1600"
        alt="Restaurant background"
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      /> */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f7f0fd]/70 via-[#dfc9b8]/50 to-[#ae8c72]/40" />

      {/* Decorative Glows */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#dfc9b8] opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ae8c72] opacity-20 blur-3xl rounded-full" />

      {/* Header */}
      <header className="text-center mb-12 z-10">
        <h1 className="text-5xl font-extrabold text-[#04040b] drop-shadow-lg tracking-wide">
          Tasty<span className="text-[#ae8c72]">FOODS</span>
        </h1>
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          Choose your login type to continue
        </p>
      </header>

      {/* Login Role Boxes */}
      <div className="flex flex-col md:flex-row gap-8 z-10">
        {/* Manager Box */}
        <div className="bg-gradient-to-br from-[#f7f0fd]/50 via-[#dfc9b8]/40 to-[#ae8c72]/30 border border-red-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
          {/* <div className="absolute top-3 right-3 w-4 h-4 bg-red-500 rounded-full animate-pulse" /> */}
          <div className="bg-red-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FaUserTie className="text-5xl text-[#ae8c72]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#04040b] mb-2">Manager</h2>
          <p className="text-gray-700 mb-6">
            Access admin features and manage operations.
          </p>
          <button
            className="bg-[#ae8c72] hover:bg-[#ae8c72] text-black font-semibold py-3 px-8 rounded-full transition"
            onClick={() => navigate("/manager-login", { replace: true })}
          >
            Login as Manager
          </button>
        </div>

        {/* Employee Box */}
        <div className="bg-gradient-to-br from-[#f7f0fd]/50 via-[#dfc9b8]/40 to-[#ae8c72]/30 border border-green-500/20 rounded-3xl shadow-2xl p-10 w-80 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative">
          {/* <div className="absolute top-3 right-3 w-4 h-4 bg-green-400 rounded-full animate-pulse" /> */}
          <div className="bg-green-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FaUsers className="text-5xl text-[#ae8c72]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#04040b] mb-2">Employee</h2>
          <p className="text-gray-700 mb-6">
            Log in to view tasks, orders, and schedule.
          </p>
          <button
            className="bg-[#ae8c72] hover:bg-[#ae8c72] text-black font-semibold py-3 px-8 rounded-full transition"
            onClick={() => navigate("/employee-login", { replace: true })}
          >
            Login as Employee
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs text-gray-600 text-center z-10">
        <p>© {new Date().getFullYear()} TastyFoods. All Rights Reserved.</p>
      </footer>
    </div>
  );
}


// import React from "react";
// import { FaUserTie, FaUsers } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function LoginSelector() {
//   const navigate = useNavigate();

//   const gradientColors = {
//     light: "#f7f0fd",
//     medium: "#dfc9b8",
//     dark: "#ae8c72",
//     cardLight: "rgba(247, 240, 253, 0.8)", // card overlay color
//     cardMedium: "rgba(223, 201, 184, 0.8)",
//     cardDark: "rgba(174, 140, 114, 0.8)",
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
//       {/* Background Image */}
//       <img
//         src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=1600"
//         alt="Restaurant Background"
//         className="absolute inset-0 w-full h-full object-cover brightness-90"
//       />

//       {/* Gradient Overlay */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: `linear-gradient(to bottom, ${gradientColors.light}/50, ${gradientColors.medium}/40, ${gradientColors.dark}/70)`,
//         }}
//       />

//       {/* Decorative Glows */}
//       <div
//         className="absolute -top-24 -left-24 w-72 h-72 opacity-25 blur-3xl rounded-full"
//         style={{ backgroundColor: gradientColors.medium }}
//       />
//       <div
//         className="absolute bottom-0 right-0 w-80 h-80 opacity-25 blur-3xl rounded-full"
//         style={{ backgroundColor: gradientColors.dark }}
//       />

//       {/* Header */}
//       <header className="text-center mb-12 z-10">
//         <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide" style={{ color: gradientColors.dark }}>
//           Tasty<span style={{ color: gradientColors.medium }}>FOODS</span>
//         </h1>
//         <p className="text-gray-700 mt-2 text-sm md:text-base">
//           Choose your login type to continue
//         </p>
//       </header>

//       {/* Login Role Boxes */}
//       <div className="flex flex-col md:flex-row gap-10 z-10 px-4">
//         {/* Manager Box */}
//         <div
//           className="rounded-3xl shadow-2xl p-12 md:p-16 w-72 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative border"
//           style={{
//             backgroundColor: gradientColors.cardDark, // solid card color
//             borderColor: gradientColors.dark + "80",
//           }}
//         >
//           <div
//             className="absolute top-3 right-3 w-4 h-4 rounded-full animate-pulse"
//             style={{ backgroundColor: gradientColors.dark }}
//           />
//           <div
//             className="p-6 rounded-full w-28 h-28 mx-auto mb-6 flex items-center justify-center"
//             style={{ backgroundColor: gradientColors.cardMedium }}
//           >
//             <FaUserTie className="text-6xl" style={{ color: gradientColors.dark }} />
//           </div>
//           <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{ color: gradientColors.dark }}>
//             Manager
//           </h2>
//           <p className="text-gray-700 mb-6">
//             Access admin features and manage operations.
//           </p>
//           <button
//             className="text-white font-semibold py-3 px-10 rounded-full transition text-lg md:text-base"
//             style={{ backgroundColor: gradientColors.dark }}
//             onClick={() => navigate("/manager-login", { replace: true })}
//           >
//             Login as Manager
//           </button>
//         </div>

//         {/* Employee Box */}
//         <div
//           className="rounded-3xl shadow-2xl p-12 md:p-16 w-72 md:w-96 text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative border"
//           style={{
//             backgroundColor: gradientColors.cardMedium, // solid card color
//             borderColor: gradientColors.medium + "80",
//           }}
//         >
//           <div
//             className="absolute top-3 right-3 w-4 h-4 rounded-full animate-pulse"
//             style={{ backgroundColor: gradientColors.medium }}
//           />
//           <div
//             className="p-6 rounded-full w-28 h-28 mx-auto mb-6 flex items-center justify-center"
//             style={{ backgroundColor: gradientColors.cardLight }}
//           >
//             <FaUsers className="text-6xl" style={{ color: gradientColors.dark }} />
//           </div>
//           <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{ color: gradientColors.dark }}>
//             Employee
//           </h2>
//           <p className="text-gray-700 mb-6">
//             Log in to view tasks, orders, and schedule.
//           </p>
//           <button
//             className="text-white font-semibold py-3 px-10 rounded-full transition text-lg md:text-base"
//             style={{ backgroundColor: gradientColors.medium }}
//             onClick={() => navigate("/employee-login", { replace: true })}
//           >
//             Login as Employee
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 text-xs md:text-sm text-gray-600 text-center z-10">
//         <p>© {new Date().getFullYear()} TastyFoods. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }



