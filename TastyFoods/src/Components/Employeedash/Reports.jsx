// import React from "react";
// import EmployeeNavbar from "../Employeedash/Navbar";
// import { useSelector } from "react-redux"; // ✅ import useSelector
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   BarChart,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";
// import { FaUserCircle, FaStar, FaBox, FaRupeeSign } from "react-icons/fa";

// export default function EmployeeReports() {
//   // ✅ Get current logged-in user from Redux
//   const { currentUser } = useSelector((state) => state.login);

//   // fallback in case no user is logged in
//   const employee = {
//     id: currentUser?.id || "EMP-XXXX",
//     name: currentUser?.name || "Employee Name",
//     role: currentUser?.role || "Role",
//     photo: currentUser?.photo || "",
//     totalSales: 15500,
//     totalOrders: 842,
//     avgOrderValue: 184.15,
//     completionRate: 98,
//     satisfaction: 4.7,
//   };

//   // ... rest of your code remains the same

//   const weeklySalesData = [
//     { day: "Mon", sales: 220 },
//     { day: "Tue", sales: 280 },
//     { day: "Wed", sales: 250 },
//     { day: "Thu", sales: 300 },
//     { day: "Fri", sales: 480 },
//     { day: "Sat", sales: 600 },
//     { day: "Sun", sales: 390 },
//   ];

//   const topItems = [
//     { name: "Cheese Burger", orders: 24 },
//     { name: "Veg Wrap", orders: 19 },
//     { name: "Cold Coffee", orders: 16 },
//     { name: "Fries", orders: 14 },
//     { name: "Pasta", orders: 10 },
//   ];

//   const shiftOrders = [
//     { period: "Morning (9 AM - 2 PM)", count: 312 },
//     { period: "Evening (5 PM - 10 PM)", count: 530 },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <EmployeeNavbar />
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-8 text-green-400">
//           👨‍🍳 {employee.name}'s Performance Dashboard
//         </h1>

//         {/* Employee Overview Card */}
//         <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-6 mb-10 flex items-center justify-between shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] transition-all duration-300">
//           <div className="flex items-center gap-5">
//             {employee.photo ? (
//               <img
//                 src={employee.photo}
//                 alt={employee.name}
//                 className="w-20 h-20 rounded-full border-2 border-green-400"
//               />
//             ) : (
//               <FaUserCircle className="text-6xl text-green-400" />
//             )}
//             <div>
//               <h2 className="text-2xl font-semibold text-white">
//                 {employee.name}
//               </h2>
//               <p className="text-gray-400">{employee.role}</p>
//               <p className="text-gray-500 text-sm mt-1">ID: {employee.id}</p>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-10 text-center">
//             <div>
//               <FaRupeeSign className="text-green-400 mx-auto text-xl" />
//               <p className="text-lg font-bold text-green-400">
//                 ₹{employee.totalSales.toLocaleString()}
//               </p>
//               <p className="text-gray-400 text-sm">Total Sales</p>
//             </div>
//             <div>
//               <FaBox className="text-yellow-400 mx-auto text-xl" />
//               <p className="text-lg font-bold text-yellow-400">
//                 {employee.totalOrders}
//               </p>
//               <p className="text-gray-400 text-sm">Orders Handled</p>
//             </div>
//             <div>
//               <FaStar className="text-red-400 mx-auto text-xl" />
//               <p className="text-lg font-bold text-red-400">
//                 {employee.satisfaction}⭐
//               </p>
//               <p className="text-gray-400 text-sm">Avg Rating</p>
//             </div>
//           </div>
//         </div>

//         {/* Graphs Section */}
//         <div className="grid lg:grid-cols-2 gap-10">
//           {/* Line Chart - Weekly Sales */}
//           <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg">
//             <h2 className="text-xl mb-4 text-gray-300">Weekly Sales</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={weeklySalesData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                 <XAxis dataKey="day" stroke="#aaa" />
//                 <YAxis stroke="#aaa" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#22c55e"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart - Top Items */}
//           <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg">
//             <h2 className="text-xl mb-4 text-green-400 font-semibold tracking-wide">
//               🍔 Top Items Sold by {employee.name}
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={topItems}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                 <XAxis dataKey="name" stroke="#aaa" />
//                 <YAxis stroke="#aaa" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     border: "1px solid #374151",
//                     borderRadius: "8px",
//                   }}
//                   labelStyle={{ color: "#22c55e" }}
//                 />
//                 <Bar
//                   dataKey="orders"
//                   fill="url(#itemGradient)"
//                   radius={[10, 10, 0, 0]}
//                 />
//                 <defs>
//                   <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
//                     <stop offset="100%" stopColor="#ef4444" stopOpacity={0.9} />
//                   </linearGradient>
//                 </defs>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bottom Summary */}
//         <div className="grid md:grid-cols-3 gap-6 mt-10">
//           <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center">
//             <h3 className="text-xl font-semibold text-green-400 mb-3">
//               💰 Avg Order Value
//             </h3>
//             <p className="text-2xl font-bold text-white">
//               ₹{employee.avgOrderValue}
//             </p>
//           </div>
//           <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center">
//             <h3 className="text-xl font-semibold text-yellow-400 mb-3">
//               ⚡ Completion Rate
//             </h3>
//             <p className="text-2xl font-bold text-white">
//               {employee.completionRate}%
//             </p>
//           </div>
//           <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center">
//             <h3 className="text-xl font-semibold text-red-400 mb-3">
//               ⭐ Customer Satisfaction
//             </h3>
//             <p className="text-2xl font-bold text-white">
//               {employee.satisfaction}/5
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import EmployeeNavbar from "../Employeedash/Navbar";
// import { useSelector } from "react-redux";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   BarChart,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";
// import { FaUserCircle, FaStar, FaBox, FaRupeeSign } from "react-icons/fa";

// export default function EmployeeReports() {
//   const { currentUser } = useSelector((state) => state.login);

//   const [employee, setEmployee] = useState({
//     id: currentUser?.id || "EMP-XXXX",
//     name: currentUser?.name || "Employee Name",
//     role: currentUser?.role || "Role",
//     photo: currentUser?.photo || "",
//     totalSales: 15500,
//     totalOrders: 842,
//     avgOrderValue: 184.15,
//     completionRate: 98,
//     satisfaction: 4.7,
//   });

//   // Upload profile picture
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setEmployee((prev) => ({ ...prev, photo: reader.result }));
//       localStorage.setItem("employeePhoto", JSON.stringify(reader.result));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Load saved photo
//   useEffect(() => {
//     const savedPhoto = JSON.parse(localStorage.getItem("employeePhoto"));
//     if (savedPhoto) setEmployee((prev) => ({ ...prev, photo: savedPhoto }));
//   }, []);

//   const weeklySalesData = [
//     { day: "Mon", sales: 220 },
//     { day: "Tue", sales: 280 },
//     { day: "Wed", sales: 250 },
//     { day: "Thu", sales: 300 },
//     { day: "Fri", sales: 480 },
//     { day: "Sat", sales: 600 },
//     { day: "Sun", sales: 390 },
//   ];

//   const topItems = [
//     { name: "Cheese Burger", orders: 24 },
//     { name: "Veg Wrap", orders: 19 },
//     { name: "Cold Coffee", orders: 16 },
//     { name: "Fries", orders: 14 },
//     { name: "Pasta", orders: 10 },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b]">
//       <EmployeeNavbar />
//       <div className="p-8 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-[#04040b]">
//           👨‍🍳 {employee.name}'s Performance Dashboard
//         </h1>

//         {/* Employee Card */}
//         <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 mb-10 flex flex-col md:flex-row items-center md:justify-between shadow-lg hover:shadow-[#ae8c72]/40 transition-all duration-300 gap-6">
//           <div className="flex items-center gap-5">
//             {employee.photo ? (
//               <img
//                 src={employee.img}
//                 alt={employee.name}
//                 className="w-20 h-20 rounded-full border-2 border-[#ae8c72]"
//               />
//             ) : (
//               <FaUserCircle className="text-6xl text-[#ae8c72]" />
//             )}
//             <div>
//               <h2 className="text-2xl font-semibold">{employee.name}</h2>
//               <p className="text-[#04040b]/70">{employee.role}</p>
//               <p className="text-[#04040b]/50 text-sm mt-1">
//                 ID: {employee.id}
//               </p>

//               {/* Upload input */}
//               <label className="mt-2 inline-block cursor-pointer text-sm text-[#04040b]/70 hover:text-[#ae8c72] transition">
//                 Change Photo
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-6 mt-4 md:mt-0 text-center">
//             <div>
//               <FaRupeeSign className="text-[#ae8c72] mx-auto text-xl" />
//               <p className="text-lg font-bold text-[#ae8c72]">
//                 ₹{employee.totalSales.toLocaleString()}
//               </p>
//               <p className="text-[#04040b]/70 text-sm">Total Sales</p>
//             </div>
//             <div>
//               <FaBox className="text-[#ae8c72] mx-auto text-xl" />
//               <p className="text-lg font-bold text-[#ae8c72]">
//                 {employee.totalOrders}
//               </p>
//               <p className="text-[#04040b]/70 text-sm">Orders Handled</p>
//             </div>
//             <div>
//               <FaStar className="text-[#ef4444] mx-auto text-xl" />
//               <p className="text-lg font-bold text-[#ef4444]">
//                 {employee.satisfaction}⭐
//               </p>
//               <p className="text-[#04040b]/70 text-sm">Avg Rating</p>
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid lg:grid-cols-2 gap-10">
//           <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 shadow-lg">
//             <h2 className="text-xl mb-4 text-[#04040b] font-semibold">
//               Weekly Sales
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={weeklySalesData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
//                 <XAxis dataKey="day" stroke="#04040b" />
//                 <YAxis stroke="#04040b" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#f7f0fd",
//                     border: "1px solid #ae8c72",
//                     borderRadius: "8px",
//                   }}
//                   labelStyle={{ color: "#04040b" }}
//                   itemStyle={{ color: "#04040b" }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#ae8c72"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 shadow-lg">
//             <h2 className="text-xl mb-4 text-[#04040b] font-semibold">
//               🍔 Top Items Sold
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={topItems}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
//                 <XAxis dataKey="name" stroke="#04040b" />
//                 <YAxis stroke="#04040b" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#f7f0fd",
//                     border: "1px solid #ae8c72",
//                     borderRadius: "8px",
//                   }}
//                   labelStyle={{ color: "#04040b" }}
//                   itemStyle={{ color: "#04040b" }}
//                 />
//                 <Bar
//                   dataKey="orders"
//                   radius={[10, 10, 0, 0]}
//                   fill="url(#itemGradient)"
//                   label={{ position: "top", fill: "#04040b", fontSize: 12 }}
//                 />
//                 <defs>
//                   <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#dfc9b8" stopOpacity={0.9} />{" "}
//                     {/* Light at top */}
//                     <stop
//                       offset="100%"
//                       stopColor="#ae8c72"
//                       stopOpacity={0.9}
//                     />{" "}
//                     {/* Dark at bottom */}
//                   </linearGradient>
//                 </defs>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bottom Stats */}
//         <div className="grid md:grid-cols-3 gap-6 mt-10">
//           <div className="rounded-3xl bg-[#f7f0fd]/50 border border-[#ae8c72] p-6 text-center">
//             <h3 className="text-xl font-semibold text-[#ae8c72] mb-3">
//               💰 Avg Order Value
//             </h3>
//             <p className="text-2xl font-bold text-[#04040b]">
//               ₹{employee.avgOrderValue}
//             </p>
//           </div>
//           <div className="rounded-3xl bg-[#f7f0fd]/50 border border-[#ae8c72] p-6 text-center">
//             <h3 className="text-xl font-semibold text-[#ae8c72] mb-3">
//               ⚡ Completion Rate
//             </h3>
//             <p className="text-2xl font-bold text-[#04040b]">
//               {employee.completionRate}%
//             </p>
//           </div>
//           <div className="rounded-3xl bg-[#f7f0fd]/50 border border-[#ae8c72] p-6 text-center">
//             <h3 className="text-xl font-semibold text-[#ef4444] mb-3">
//               ⭐ Customer Satisfaction
//             </h3>
//             <p className="text-2xl font-bold text-[#04040b]">
//               {employee.satisfaction}/5
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeNavbar from "../Employeedash/Navbar";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { FaUserCircle, FaStar, FaBox, FaRupeeSign, FaTrophy } from "react-icons/fa";

export default function EmployeeReports() {
  const { currentUser } = useSelector((state) => state.login);

  const [employee, setEmployee] = useState(null);
  const [weeklySalesData, setWeeklySalesData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile picture upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee((prev) => ({ ...prev, photo: reader.result }));
      localStorage.setItem("employeePhoto", JSON.stringify(reader.result));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const savedPhoto = JSON.parse(localStorage.getItem("employeePhoto"));
    if (savedPhoto) {
      setEmployee((prev) => (prev ? { ...prev, photo: savedPhoto } : null));
    }

    const fetchReports = async () => {
      try {
        const [empRes, menuRes] = await Promise.all([
          axios.get("http://localhost:3000/employees"),
          axios.get("http://localhost:3000/menu"),
        ]);

        const employees = empRes.data;
        const history = JSON.parse(localStorage.getItem("history")) || [];

        const empData =
          employees.find((e) => e.id === currentUser?.id) || {
            id: currentUser?.id || "EMP-XXXX",
            name: currentUser?.name || "Employee Name",
            role: currentUser?.role || "Role",
            photo: "",
          };

        // Weekly sales (demo/random)
        const weeklyData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (day) => ({ day, sales: Math.floor(Math.random() * 2000) + 500 })
        );

        // Top items
        const dishCount = {};
        history.forEach((h) => {
          dishCount[h.item] = (dishCount[h.item] || 0) + 1;
        });
        const sortedDishes = Object.entries(dishCount)
          .map(([name, orders]) => ({ name, orders }))
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 5);

        // Top employees
        const empCount = {};
        history.forEach((h) => {
          if (h.employee) empCount[h.employee] = (empCount[h.employee] || 0) + 1;
        });
        const sortedEmployees = Object.entries(empCount)
          .map(([name, orders]) => ({ name, orders }))
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 5);

        // Totals
        const totalSales = history.reduce((sum, h) => {
          const amount = parseFloat(h.total?.replace(/[^0-9.-]+/g, "")) || 0;
          return sum + amount;
        }, 0);
        const totalOrders = history.length;
        const avgOrderValue = totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0;

        setEmployee({
          ...empData,
          totalSales,
          totalOrders,
          avgOrderValue,
          completionRate: 100,
          satisfaction: 4.8,
        });
        setTopItems(sortedDishes);
        setTopEmployees(sortedEmployees);
        setWeeklySalesData(weeklyData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [currentUser]);

  if (loading || !employee) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#04040b] bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70]">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b]">
      <EmployeeNavbar />
      <div className="p-8 max-w-7xl mx-auto">

        {/* Employee Overview */}
        <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg hover:shadow-[#ae8c72]/40 transition-all duration-300 gap-6">
          <div className="flex items-center gap-5 mb-5 md:mb-0">
            {employee.img ? (
              <img
                src={employee.img}
                alt={employee.name}
                className="w-24 h-24 rounded-full border-2 border-[#ae8c72]"
              />
            ) : (
              <FaUserCircle className="text-6xl text-[#ae8c72]" />
            )}
            <div>
              <h2 className="text-2xl font-semibold">{employee.name}</h2>
              <p className="text-[#04040b]/70">{employee.role}</p>
              <p className="text-[#04040b]/50 text-sm mt-1">ID: {employee.id}</p>
              <label className="mt-2 inline-block cursor-pointer text-sm text-[#04040b]/70 hover:text-[#ae8c72] transition">
                Change Photo
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4 md:mt-0 text-center">
            <div>
              <FaRupeeSign className="text-[#ae8c72] mx-auto text-xl" />
              <p className="text-lg font-bold text-[#ae8c72]">₹{employee.totalSales.toLocaleString()}</p>
              <p className="text-[#04040b]/70 text-sm">Total Sales</p>
            </div>
            <div>
              <FaBox className="text-[#ae8c72] mx-auto text-xl" />
              <p className="text-lg font-bold text-[#ae8c72]">{employee.totalOrders}</p>
              <p className="text-[#04040b]/70 text-sm">Orders Handled</p>
            </div>
            <div>
              <FaStar className="text-[#ef4444] mx-auto text-xl" />
              <p className="text-lg font-bold text-[#ef4444]">{employee.satisfaction}⭐</p>
              <p className="text-[#04040b]/70 text-sm">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl mb-4 text-[#04040b] font-semibold">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
                <XAxis dataKey="day" stroke="#04040b" />
                <YAxis stroke="#04040b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f7f0fd", border: "1px solid #ae8c72", borderRadius: "8px" }}
                  labelStyle={{ color: "#04040b" }}
                  itemStyle={{ color: "#04040b" }}
                />
                <Line type="monotone" dataKey="sales" stroke="#ae8c72" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl mb-4 text-[#04040b] font-semibold">🍔 Top Items Sold</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topItems}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
                <XAxis dataKey="name" stroke="#04040b" />
                <YAxis stroke="#04040b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f7f0fd", border: "1px solid #ae8c72", borderRadius: "8px" }}
                  labelStyle={{ color: "#04040b" }}
                  itemStyle={{ color: "#04040b" }}
                />
                <Bar
                  dataKey="orders"
                  radius={[10, 10, 0, 0]}
                  fill="url(#itemGradient)"
                  label={{ position: "top", fill: "#04040b", fontSize: 12 }}
                />
                <defs>
                  <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dfc9b8" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#ae8c72" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Employees */}
        <div className="mt-10 bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl mb-4 text-[#ae8c72] font-semibold tracking-wide flex items-center gap-2">
            <FaTrophy /> Top Performing Employees
          </h2>
          <ul className="space-y-3">
            {topEmployees.length > 0 ? (
              topEmployees.map((emp, i) => (
                <li key={i} className="flex justify-between bg-[#f7f0fd]/50 px-4 py-3 rounded-xl">
                  <span>{i + 1}. {emp.name}</span>
                  <span className="text-[#ae8c72] font-semibold">{emp.orders} orders</span>
                </li>
              ))
            ) : (
              <p className="text-[#04040b]/70">No data available</p>
            )}
          </ul>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="rounded-3xl bg-[#f7f0fd]/50 border border-[#ae8c72] p-6 text-center">
            <h3 className="text-xl font-semibold text-[#ae8c72] mb-3">💰 Avg Order Value</h3>
            <p className="text-2xl font-bold text-[#04040b]">₹{employee.avgOrderValue}</p>
          </div>
          <div className="rounded-3xl bg-[#f7f0fd]/50 border border-[#ae8c72] p-6 text-center">
            <h3 className="text-xl font-semibold text-[#ae8c72] mb-3">⚡ Completion Rate</h3>
            <p className="text-2xl font-bold text-[#04040b]">{employee.completionRate}%</p>
          </div>
          <div className="rounded-3xl bg-[#f7f0fd]/50 border border-[#ae8c72] p-6 text-center">
            <h3 className="text-xl font-semibold text-[#ef4444] mb-3">⭐ Customer Satisfaction</h3>
            <p className="text-2xl font-bold text-[#04040b]">{employee.satisfaction}/5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

