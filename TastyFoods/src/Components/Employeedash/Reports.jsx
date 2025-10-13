import React from "react";
import EmployeeNavbar from "../Employeedash/Navbar";
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

export default function Reports() {
  const topItemsData = [
    { name: "Cheese Burger", orders: 58 },
    { name: "Veg Wrap", orders: 42 },
    { name: "Cold Coffee", orders: 39 },
    { name: "Fries", orders: 34 },
    { name: "Pasta", orders: 28 },
  ];
  const salesData = [
    { day: "Mon", sales: 320 },
    { day: "Tue", sales: 450 },
    { day: "Wed", sales: 310 },
    { day: "Thu", sales: 540 },
    { day: "Fri", sales: 720 },
    { day: "Sat", sales: 980 },
    { day: "Sun", sales: 640 },
  ];

  const categoryData = [
    { name: "Burgers", value: 35 },
    { name: "Pizza", value: 45 },
    { name: "Wraps", value: 20 },
    { name: "Drinks", value: 15 },
  ];

  const ordersHandled = [
    { period: "Morning (9 AM - 2 PM)", count: 125 },
    { period: "Evening (5 PM - 10 PM)", count: 198 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <EmployeeNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-green-400">
          📊 Sales & Performance Reports
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Line Chart */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl mb-4 text-gray-300">
              Weekly Sales Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
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

          {/* Bar Chart */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,0,0.15)] transition-all duration-300">
            <h2 className="text-xl mb-4 text-green-400 font-semibold tracking-wide">
              🍔 Most Ordered Items Today
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topItemsData}>
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
                  fill="url(#colorGradient)"
                  radius={[10, 10, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Most Ordered Items Today */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,0,0.15)] transition-all duration-300">
              <h2 className="text-xl mb-4 text-green-400 font-semibold tracking-wide">
                🍔 Most Ordered Items Today
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topItemsData}>
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
                    fill="url(#colorGradient)"
                    radius={[10, 10, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#ef4444"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Total Orders Handled */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
              <h2 className="text-xl mb-4 text-red-400 font-semibold tracking-wide">
                📦 Total Orders Handled
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersHandled}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="period" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#ef4444" }}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#orderGradient)"
                    barSize={60}
                    radius={[12, 12, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="orderGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#22c55e"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>

              {/* Small Summary */}
              <div className="mt-4 flex justify-center gap-6 text-gray-300">
                <p>
                  🌅 Morning Orders:{" "}
                  <span className="text-green-400 font-bold">
                    {ordersHandled[0].count}
                  </span>
                </p>
                <p>
                  🌇 Evening Orders:{" "}
                  <span className="text-red-400 font-bold">
                    {ordersHandled[1].count}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Summary Stats - Refined Glass UI */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Left Section */}
            <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300 d-flex align-content-center">
              <h3 className="text-xl font-semibold text-green-400 mb-4">
                💰 Weekly Summary
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  Total Weekly Sales:{" "}
                  <span className="text-green-400 font-bold text-lg">
                    ₹15,500
                  </span>
                </p>
                <p>
                  Best Selling Day:{" "}
                  <span className="text-red-400 font-bold text-lg">
                    Saturday
                  </span>
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="rounded-3xl bg-gray-900/50 border border-gray-800 p-6 text-center hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300 d-flex align-content-center">
              <h3 className="text-xl font-semibold text-red-400 mb-4">
                📦 Order Insights
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  Average Daily Orders:{" "}
                  <span className="text-yellow-400 font-bold text-lg">
                    120+
                  </span>
                </p>
                <p>
                  Most Ordered Item:{" "}
                  <span className="text-green-400 font-bold text-lg">
                    Cheese Burger
                  </span>
                </p>
              </div>
              <button className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-green-500/80 to-red-500/80 hover:from-green-500 hover:to-red-500 text-white font-medium px-6 py-2 rounded-full shadow-md shadow-green-500/20 transition-all duration-300 hover:scale-105">
                ⬇️ Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
