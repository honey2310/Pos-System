import React from "react";
import EmployeeNavbar from "../Employeedash/Navbar";
import { useSelector } from "react-redux"; // ✅ import useSelector
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
import { FaUserCircle, FaStar, FaBox, FaRupeeSign } from "react-icons/fa";

export default function EmployeeReports() {
  // ✅ Get current logged-in user from Redux
  const { currentUser } = useSelector((state) => state.login);

  // fallback in case no user is logged in
  const employee = {
    id: currentUser?.id || "EMP-XXXX",
    name: currentUser?.name || "Employee Name",
    role: currentUser?.role || "Role",
    photo: currentUser?.photo || "",
    totalSales: 15500,
    totalOrders: 842,
    avgOrderValue: 184.15,
    completionRate: 98,
    satisfaction: 4.7,
  };

  // ... rest of your code remains the same


  const weeklySalesData = [
    { day: "Mon", sales: 220 },
    { day: "Tue", sales: 280 },
    { day: "Wed", sales: 250 },
    { day: "Thu", sales: 300 },
    { day: "Fri", sales: 480 },
    { day: "Sat", sales: 600 },
    { day: "Sun", sales: 390 },
  ];

  const topItems = [
    { name: "Cheese Burger", orders: 24 },
    { name: "Veg Wrap", orders: 19 },
    { name: "Cold Coffee", orders: 16 },
    { name: "Fries", orders: 14 },
    { name: "Pasta", orders: 10 },
  ];

  const shiftOrders = [
    { period: "Morning (9 AM - 2 PM)", count: 312 },
    { period: "Evening (5 PM - 10 PM)", count: 530 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <EmployeeNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-green-400">
          👨‍🍳 {employee.name}'s Performance Dashboard
        </h1>

        {/* Employee Overview Card */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-6 mb-10 flex items-center justify-between shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] transition-all duration-300">
          <div className="flex items-center gap-5">
            {employee.photo ? (
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-20 h-20 rounded-full border-2 border-green-400"
              />
            ) : (
              <FaUserCircle className="text-6xl text-green-400" />
            )}
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {employee.name}
              </h2>
              <p className="text-gray-400">{employee.role}</p>
              <p className="text-gray-500 text-sm mt-1">ID: {employee.id}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-10 text-center">
            <div>
              <FaRupeeSign className="text-green-400 mx-auto text-xl" />
              <p className="text-lg font-bold text-green-400">
                ₹{employee.totalSales.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Total Sales</p>
            </div>
            <div>
              <FaBox className="text-yellow-400 mx-auto text-xl" />
              <p className="text-lg font-bold text-yellow-400">
                {employee.totalOrders}
              </p>
              <p className="text-gray-400 text-sm">Orders Handled</p>
            </div>
            <div>
              <FaStar className="text-red-400 mx-auto text-xl" />
              <p className="text-lg font-bold text-red-400">
                {employee.satisfaction}⭐
              </p>
              <p className="text-gray-400 text-sm">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Line Chart - Weekly Sales */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl mb-4 text-gray-300">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Top Items */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl mb-4 text-green-400 font-semibold tracking-wide">
              🍔 Top Items Sold by {employee.name}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topItems}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#22c55e" }}
                />
                <Bar
                  dataKey="orders"
                  fill="url(#itemGradient)"
                  radius={[10, 10, 0, 0]}
                />
                <defs>
                  <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center">
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              💰 Avg Order Value
            </h3>
            <p className="text-2xl font-bold text-white">
              ₹{employee.avgOrderValue}
            </p>
          </div>
          <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              ⚡ Completion Rate
            </h3>
            <p className="text-2xl font-bold text-white">
              {employee.completionRate}%
            </p>
          </div>
          <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              ⭐ Customer Satisfaction
            </h3>
            <p className="text-2xl font-bold text-white">
              {employee.satisfaction}/5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
