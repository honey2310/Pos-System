// import React, { useState, useEffect } from "react";
// import EmployeeNavbar from "./Navbar";

// export default function History() {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     // Get completed orders from localStorage
//     const completedOrders = JSON.parse(localStorage.getItem("history")) || [];

//     // If we also want employee names, we can store it when moving to history
//     setHistory(completedOrders);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
//       <EmployeeNavbar />

//       {/* Page Header */}
//       <div className="text-center mb-10 p-8">
//         <h1 className="text-4xl font-extrabold tracking-wide">
//           Order <span className="text-red-400">History</span>
//         </h1>
//         <p className="text-gray-400 text-sm mt-2">
//           A record of all previously completed in-restaurant orders
//         </p>
//       </div>

//       {/* Table Container */}
//       <div className="bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden shadow-lg shadow-black/40 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,0,0,0.15)] transition-all duration-300">
//         <table className="w-full text-left">
//           <thead className="bg-gray-800/60 text-gray-300">
//             <tr>
//               {["Order ID", "Item", "Total", "Date", "Employee", "Status"].map(
//                 (header, i) => (
//                   <th
//                     key={i}
//                     className={`px-6 py-3 text-sm font-semibold ${
//                       header === "Status" ? "text-right" : ""
//                     }`}
//                   >
//                     {header}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((order, idx) => (
//               <tr
//                 key={idx}
//                 className="border-t border-gray-800 hover:bg-gray-800/40 transition-all duration-200"
//               >
//                 <td className="px-6 py-4 text-gray-400">{order.id}</td>
//                 <td className="px-6 py-4 font-medium">{order.item}</td>
//                 <td className="px-6 py-4 text-green-400 font-semibold">
//                   {order.total}
//                 </td>
//                 <td className="px-6 py-4 text-gray-400">{order.date}</td>
//                 <td className="px-6 py-4 text-gray-300 font-medium">
//                   {order.employee || "Unknown"}
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
//                     Completed
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import EmployeeNavbar from "./Navbar";
import { motion } from "framer-motion";

export default function History() {
  const [history, setHistory] = useState([]);
  const [filterDate, setFilterDate] = useState("All");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
      setHistory(savedHistory);
    };
    loadHistory();
    window.addEventListener("storage", loadHistory);
    return () => window.removeEventListener("storage", loadHistory);
  }, []);

  const handleDelete = (id, item) => {
    if (window.confirm(`Delete order ${id} - ${item}?`)) {
      const updated = history.filter((h) => !(h.id === id && h.item === item));
      localStorage.setItem("history", JSON.stringify(updated));
      setHistory(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all history?")) {
      localStorage.removeItem("history");
      setHistory([]);
    }
  };

  const parseOrderDate = (dateStr) => {
    // If your date is DD-MM-YYYY, reverse it to YYYY-MM-DD for JS Date
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts[0].length === 2) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    }
    return new Date(dateStr);
  };

const filteredHistory = history.filter((h) => {
  const [day, month, year] = h.date.split("-"); // assuming DD-MM-YYYY
  const orderDate = new Date(`${year}-${month}-${day}`);
  orderDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (filterDate === "All") return true;
  if (filterDate === "Today") return orderDate.getTime() === today.getTime();
  if (filterDate === "Yesterday") return orderDate.getTime() === yesterday.getTime();
  if (filterDate === "Custom") {
    if (!customRange.start || !customRange.end) return true;
    const startDate = new Date(customRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(customRange.end);
    endDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() >= startDate.getTime() && orderDate.getTime() <= endDate.getTime();
  }
  return true;
});


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b]">
      <EmployeeNavbar />

      {/* Page Header */}
      <div className="text-center mb-8 p-8">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Order <span className="text-[#ae8c72]">History</span>
        </h1>
        <p className="text-[#04040b]/70 text-sm mt-2">
          A record of all previously completed in-restaurant orders
        </p>
      </div>

      {/* Filters & Clear All */}
      <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto px-8 mb-6 gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-[#04040b] font-medium">Date:</label>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-white/70 text-[#04040b] border border-[#ae8c72] rounded-xl px-3 py-1"
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Custom">Custom Range</option>
          </select>

          {filterDate === "Custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customRange.start}
                onChange={(e) =>
                  setCustomRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="bg-white/70 text-[#04040b] border border-[#ae8c72] rounded-xl px-3 py-1"
              />
              <span className="text-[#04040b]">to</span>
              <input
                type="date"
                value={customRange.end}
                onChange={(e) =>
                  setCustomRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="bg-white/70 text-[#04040b] border border-[#ae8c72] rounded-xl px-3 py-1"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleClearAll}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Table Container */}
      <div className="max-w-6xl mx-auto bg-white/70 border border-[#ae8c72] rounded-3xl overflow-hidden shadow-lg shadow-[#ae8c72]/25 backdrop-blur-md transition-all duration-300">
        <table className="w-full text-left">
          <thead className="bg-[#dfc9b8]/50 text-[#04040b]">
            <tr>
              {["Order ID", "Item", "Total", "Date", "Employee", "Status", "Action"].map(
                (header, i) => (
                  <th
                    key={i}
                    className={`px-6 py-3 text-sm font-semibold ${
                      header === "Action" ? "text-right" : ""
                    }`}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-[#04040b]/50">
                  No records found
                </td>
              </tr>
            ) : (
              filteredHistory.map((order, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`border-t border-[#ae8c72]/50 transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-white/30" : "bg-white/10"
                  } hover:bg-[#dfc9b8]/40`}
                >
                  <td className="px-6 py-4 text-[#04040b]/70">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-[#04040b]">{order.item}</td>
                  <td className="px-6 py-4 font-semibold text-[#ae8c72]">{order.total}</td>
                  <td className="px-6 py-4 text-[#04040b]/70">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-[#04040b]">{order.employee || "Unknown"}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(order.id, order.item)}
                      className="text-red-600 hover:text-red-800 text-xl font-bold"
                      title="Delete"
                    >
                      ×
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
