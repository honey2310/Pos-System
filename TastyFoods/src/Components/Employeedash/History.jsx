import React, { useState, useEffect } from "react";
import EmployeeNavbar from "./Navbar";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Get completed orders from localStorage
    const completedOrders = JSON.parse(localStorage.getItem("history")) || [];

    // If we also want employee names, we can store it when moving to history
    setHistory(completedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <EmployeeNavbar />

      {/* Page Header */}
      <div className="text-center mb-10 p-8">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Order <span className="text-red-400">History</span>
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          A record of all previously completed in-restaurant orders
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden shadow-lg shadow-black/40 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,0,0,0.15)] transition-all duration-300">
        <table className="w-full text-left">
          <thead className="bg-gray-800/60 text-gray-300">
            <tr>
              {["Order ID", "Item", "Total", "Date", "Employee", "Status"].map(
                (header, i) => (
                  <th
                    key={i}
                    className={`px-6 py-3 text-sm font-semibold ${
                      header === "Status" ? "text-right" : ""
                    }`}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {history.map((order, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-800 hover:bg-gray-800/40 transition-all duration-200"
              >
                <td className="px-6 py-4 text-gray-400">{order.id}</td>
                <td className="px-6 py-4 font-medium">{order.item}</td>
                <td className="px-6 py-4 text-green-400 font-semibold">
                  {order.total}
                </td>
                <td className="px-6 py-4 text-gray-400">{order.date}</td>
                <td className="px-6 py-4 text-gray-300 font-medium">
                  {order.employee || "Unknown"}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}