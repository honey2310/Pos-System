import React, { useState } from "react";
import {
  FaUserTie,
  FaUsers,
  FaDollarSign,
  FaUtensils,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ManagerNavbar from "./ManagerNavbar"; // optional: create similar to EmployeeNavbar

export default function ManagerDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [dateRange, setDateRange] = useState("Monthly");

  // 🧠 Dummy Data (replace with real data from backend or Redux)
  const employees = ["All", "John", "Sarah", "Amit", "Priya"];
  const summaryData = {
    totalEmployees: 12,
    totalOrders: 156,
    totalRevenue: 23800,
    totalCustomers: 720,
  };

  const salesData = [
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 300 },
    { name: "Wed", sales: 500 },
    { name: "Thu", sales: 280 },
    { name: "Fri", sales: 650 },
    { name: "Sat", sales: 900 },
    { name: "Sun", sales: 450 },
  ];

  const topEmployees = [
    { name: "John", orders: 120 },
    { name: "Sarah", orders: 110 },
    { name: "Amit", orders: 95 },
    { name: "Priya", orders: 80 },
  ];

  const topDishes = [
    { name: "Margherita Pizza", sold: 180 },
    { name: "Chicken Burger", sold: 145 },
    { name: "Pasta Alfredo", sold: 120 },
    { name: "Tacos", sold: 90 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      <ManagerNavbar />

      {/* Filters */}
      <div className="p-6 flex flex-wrap justify-between items-center gap-4 border-b border-gray-800 pt-40">
        <h1 className="text-2xl font-bold text-red-400">Manager Dashboard 👨‍💼</h1>

        <div className="flex gap-4">
          {/* Employee Filter */}
          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            {employees.map((emp) => (
              <option key={emp}>{emp}</option>
            ))}
          </select>

          {/* Date Range Filter */}
          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Employees",
            value: summaryData.totalEmployees,
            icon: <FaUserTie />,
            color: "from-red-500 to-red-700",
          },
          {
            title: "Total Orders",
            value: summaryData.totalOrders,
            icon: <FaUtensils />,
            color: "from-green-500 to-green-700",
          },
          {
            title: "Total Revenue",
            value: `$${summaryData.totalRevenue.toLocaleString()}`,
            icon: <FaDollarSign />,
            color: "from-yellow-500 to-yellow-700",
          },
          {
            title: "Customers Served",
            value: summaryData.totalCustomers,
            icon: <FaUsers />,
            color: "from-blue-500 to-blue-700",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl bg-gradient-to-br ${card.color} text-white shadow-lg flex items-center justify-between`}
          >
            <div>
              <p className="text-sm opacity-80">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
            </div>
            <div className="text-3xl opacity-70">{card.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaChartLine className="text-green-400" /> {dateRange} Sales Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #444",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Employees */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaUsers className="text-red-400" /> Top Performing Employees
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topEmployees}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #444",
                  color: "#fff",
                }}
              />
              <Bar dataKey="orders" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Dishes */}
      <div className="p-6">
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaUtensils className="text-yellow-400" /> Best Selling Dishes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {topDishes.map((dish, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-2xl p-4 text-center border border-gray-700"
              >
                <h4 className="font-semibold">{dish.name}</h4>
                <p className="text-green-400 mt-1">{dish.sold} sold</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
