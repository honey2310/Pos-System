import React from "react";
import {
  FaClock,
  FaCheckCircle,
  FaUtensils,
  FaUserTie,
  FaTable,
} from "react-icons/fa";
import { motion } from "framer-motion";
import EmployeeNavbar from "./Navbar";

export default function OrderPage() {
  const orders = [
    {
      id: "ORD-2031",
      table: "T-05",
      server: "Anita Sharma",
      item: "Paneer Tikka",
      qty: 2,
      total: 480,
      status: "Preparing",
      color: "yellow",
      placed: "12:10 PM",
      expected: "12:25 PM",
    },
    {
      id: "ORD-2032",
      table: "T-09",
      server: "Rahul Verma",
      item: "Veg Hakka Noodles",
      qty: 1,
      total: 220,
      status: "Ready",
      color: "green",
      placed: "12:20 PM",
      expected: "12:30 PM",
    },
    {
      id: "ORD-2033",
      table: "T-02",
      server: "Sanjay Kumar",
      item: "Masala Dosa",
      qty: 1,
      total: 180,
      status: "Served",
      color: "blue",
      placed: "12:00 PM",
      expected: "12:15 PM",
    },
    {
      id: "ORD-2031",
      table: "T-05",
      server: "Anita Sharma",
      item: "Paneer Tikka",
      qty: 2,
      total: 480,
      status: "Preparing",
      color: "yellow",
      placed: "12:10 PM",
      expected: "12:25 PM",
    },
    {
      id: "ORD-2032",
      table: "T-09",
      server: "Rahul Verma",
      item: "Veg Hakka Noodles",
      qty: 1,
      total: 220,
      status: "Ready",
      color: "green",
      placed: "12:20 PM",
      expected: "12:30 PM",
    },
    {
      id: "ORD-2033",
      table: "T-02",
      server: "Sanjay Kumar",
      item: "Masala Dosa",
      qty: 1,
      total: 180,
      status: "Served",
      color: "blue",
      placed: "12:00 PM",
      expected: "12:15 PM",
    },
  ];

  const getProgressWidth = (status) => {
    switch (status) {
      case "Preparing":
        return "w-1/3";
      case "Ready":
        return "w-2/3";
      case "Served":
        return "w-full";
      default:
        return "w-0";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Preparing")
      return <FaClock className="text-yellow-400 text-2xl" />;
    if (status === "Ready")
      return <FaCheckCircle className="text-green-400 text-2xl" />;
    if (status === "Served")
      return <FaUtensils className="text-blue-400 text-2xl" />;
  };

  const totalAmount = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <EmployeeNavbar />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 p-8"
      >
        <h1 className="text-4xl font-extrabold tracking-wide">
          In-Restaurant <span className="text-green-400">Orders</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Monitor live kitchen status and serving progress
        </p>
      </motion.div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-3 gap-8 px-8">
        {orders.map((order, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-3xl border border-gray-800 p-6 bg-gray-900/50 
              backdrop-blur-xl shadow-lg shadow-black/40 overflow-hidden transition-transform duration-300
              hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
          >
            {/* Neon edge line */}
            <div
              className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-${order.color}-400 to-transparent`}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400 text-sm font-light">{order.id}</p>
              <span
                className={`px-3 py-1 text-xs rounded-full bg-${order.color}-500/20 text-${order.color}-400 font-semibold`}
              >
                {order.status}
              </span>
            </div>

            {/* Table & Server Info */}
            <div className="flex justify-between items-center mb-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FaTable className="text-gray-500" />
                <span className="text-gray-300 font-medium">{order.table}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserTie className="text-gray-500" />
                <span className="text-gray-300 font-medium">{order.server}</span>
              </div>
            </div>

            {/* Order Details */}
            <h2 className="text-2xl font-semibold mb-2">{order.item}</h2>
            <p className="text-gray-400 mb-2 text-sm">
              Quantity:{" "}
              <span className="text-gray-200 font-medium">{order.qty}</span>
            </p>

            {/* Timing Info */}
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <p>
                ⏱ Placed:{" "}
                <span className="text-gray-200 font-medium">{order.placed}</span>
              </p>
              <p>
                🍴 Expected:{" "}
                <span className="text-gray-200 font-medium">
                  {order.expected}
                </span>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full mb-5 overflow-hidden">
              <div
                className={`h-full ${getProgressWidth(order.status)} bg-${order.color}-400/80 rounded-full transition-all duration-700`}
              ></div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-green-400">
                ₹{order.total.toLocaleString()}
              </span>
              {getStatusIcon(order.status)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bill Summary */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 px-8 pb-16"
      >
        <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-400">
            Bill Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 rounded-2xl p-4 shadow-inner"
            >
              <p className="text-sm text-gray-400">Total Orders</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {totalOrders}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 rounded-2xl p-4 shadow-inner"
            >
              <p className="text-sm text-gray-400">Total Revenue</p>
              <h3 className="text-2xl font-bold text-green-400 mt-1">
                ₹{totalAmount.toLocaleString()}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 rounded-2xl p-4 shadow-inner"
            >
              <p className="text-sm text-gray-400">Avg. Order Value</p>
              <h3 className="text-2xl font-bold text-blue-400 mt-1">
                ₹{Math.round(totalAmount / totalOrders)}
              </h3>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
