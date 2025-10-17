// // import React, { useState, useEffect } from "react";
// // import {
// //   FaClock,
// //   FaCheckCircle,
// //   FaUtensils,
// //   FaUserTie,
// //   FaTable,
// // } from "react-icons/fa";
// // import { motion } from "framer-motion";
// // import EmployeeNavbar from "./Navbar";

// // export default function OrderPage() {
// //   const [orders, setOrders] = useState([]);
// //   const [employees, setEmployees] = useState([]);

// //   // Load employees
// //   useEffect(() => {
// //     const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
// //     setEmployees(savedEmployees);
// //   }, []);

// //   // Real-time load orders
// //   useEffect(() => {
// //     const loadOrders = () => {
// //       let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
// //       const lastOrder = JSON.parse(localStorage.getItem("lastConfirmedOrder"));

// //       if (lastOrder) {
// //         const emp = employees.find((e) => e.id === lastOrder.employeeId);
// //         lastOrder.orders.forEach((item) => {
// //           savedOrders.push({
// //             id: lastOrder.orderId,
// //             table: lastOrder.customer.table,
// //             server: emp ? emp.name : lastOrder.employee,
// //             item: item.name,
// //             qty: item.qty,
// //             total: item.qty * parseFloat(item.price.replace("$", "")),
// //             status: "Preparing",
// //             color: "yellow",
// //             placed: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
// //             expected: new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
// //           });
// //         });
// //         localStorage.removeItem("lastConfirmedOrder");
// //         localStorage.setItem("orders", JSON.stringify(savedOrders));
// //       }

// //       setOrders(savedOrders);
// //     };

// //     loadOrders();

// //     // Poll every 2 seconds to check for new orders
// //     const interval = setInterval(loadOrders, 2000);
// //     return () => clearInterval(interval);
// //   }, [employees]);

// //   // Auto-update Preparing → Completed after 5 minutes
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setOrders((prev) => {
// //         const updatedOrders = prev.map((order) => {
// //           if (order.status === "Preparing") {
// //             // Move to history
// //             const history = JSON.parse(localStorage.getItem("history")) || [];
// //             history.push({
// //               id: order.id,
// //               item: order.item,
// //               total: `$${order.total.toFixed(2)}`,
// //               date: new Date().toLocaleDateString(),
// //               employee: order.server,
// //             });
// //             localStorage.setItem("history", JSON.stringify(history));

// //             return { ...order, status: "Completed", color: "green" };
// //           }
// //           return order;
// //         });

// //         // Only keep active orders in OrderPage
// //         const activeOrders = updatedOrders.filter((o) => o.status !== "Completed");
// //         localStorage.setItem("orders", JSON.stringify(activeOrders));
// //         return activeOrders;
// //       });
// //     }, 3000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   // Helpers
// //   const getProgressWidth = (status) => {
// //     switch (status) {
// //       case "Preparing":
// //         return "w-1/3";
// //       case "Completed":
// //         return "w-full";
// //       default:
// //         return "w-0";
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     if (status === "Preparing")
// //       return <FaClock className="text-yellow-400 text-2xl" />;
// //     if (status === "Completed")
// //       return <FaCheckCircle className="text-green-400 text-2xl" />;
// //   };

// //   const totalAmount = orders.reduce((sum, o) => sum + o.total, 0);
// //   const totalOrders = orders.length;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
// //       <EmployeeNavbar />

// //       {/* Page Header */}
// //       <motion.div
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         className="text-center mb-10 p-8"
// //       >
// //         <h1 className="text-4xl font-extrabold tracking-wide">
// //           In-Restaurant <span className="text-green-400">Orders</span>
// //         </h1>
// //         <p className="text-gray-400 mt-2 text-sm">
// //           Monitor live kitchen status and serving progress
// //         </p>
// //       </motion.div>

// //       {/* Orders Grid */}
// //       <div className="grid md:grid-cols-3 gap-8 px-8">
// //         {orders.map((order, idx) => (
// //           <motion.div
// //             key={idx}
// //             initial={{ opacity: 0, y: 40 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: idx * 0.2 }}
// //             whileHover={{ scale: 1.03 }}
// //             className="relative rounded-3xl border border-gray-800 p-6 bg-gray-900/50 
// //               backdrop-blur-xl shadow-lg shadow-black/40 overflow-hidden transition-transform duration-300
// //               hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
// //           >
// //             <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-${order.color}-400 to-transparent`} />
// //             <div className="flex justify-between items-center mb-4">
// //               <p className="text-gray-400 text-sm font-light">{order.id}</p>
// //               <span className={`px-3 py-1 text-xs rounded-full bg-${order.color}-500/20 text-${order.color}-400 font-semibold`}>
// //                 {order.status}
// //               </span>
// //             </div>

// //             <div className="flex justify-between items-center mb-4 text-gray-400 text-sm">
// //               <div className="flex items-center gap-2">
// //                 <FaTable className="text-gray-500" />
// //                 <span className="text-gray-300 font-medium">{order.table}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <FaUserTie className="text-gray-500" />
// //                 <span className="text-gray-300 font-medium">{order.server}</span>
// //               </div>
// //             </div>

// //             <h2 className="text-2xl font-semibold mb-2">{order.item}</h2>
// //             <p className="text-gray-400 mb-2 text-sm">
// //               Quantity: <span className="text-gray-200 font-medium">{order.qty}</span>
// //             </p>

// //             <div className="flex justify-between text-xs text-gray-400 mb-4">
// //               <p>⏱ Placed: <span className="text-gray-200 font-medium">{order.placed}</span></p>
// //               <p>🍴 Expected: <span className="text-gray-200 font-medium">{order.expected}</span></p>
// //             </div>

// //             <div className="w-full h-2 bg-gray-800 rounded-full mb-5 overflow-hidden">
// //               <div className={`h-full ${getProgressWidth(order.status)} bg-${order.color}-400/80 rounded-full transition-all duration-700`} />
// //             </div>

// //             <div className="flex justify-between items-center mt-4">
// //               <span className="text-xl font-bold text-green-400">${order.total.toFixed(2)}</span>
// //               {getStatusIcon(order.status)}
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>

// //       {/* Bill Summary */}
// //       <motion.div
// //         initial={{ opacity: 0, y: 60 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, delay: 0.8 }}
// //         className="mt-16 px-8 pb-16"
// //       >
// //         <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-xl p-8 text-center">
// //           <h2 className="text-3xl font-bold mb-6 text-green-400">Bill Summary</h2>

// //           <div className="grid md:grid-cols-3 gap-6 text-gray-300">
// //             <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/60 rounded-2xl p-4 shadow-inner">
// //               <p className="text-sm text-gray-400">Total Orders</p>
// //               <h3 className="text-2xl font-bold text-white mt-1">{totalOrders}</h3>
// //             </motion.div>

// //             <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/60 rounded-2xl p-4 shadow-inner">
// //               <p className="text-sm text-gray-400">Total Revenue</p>
// //               <h3 className="text-2xl font-bold text-green-400 mt-1">${totalAmount.toFixed(2)}</h3>
// //             </motion.div>

// //             <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/60 rounded-2xl p-4 shadow-inner">
// //               <p className="text-sm text-gray-400">Avg. Order Value</p>
// //               <h3 className="text-2xl font-bold text-blue-400 mt-1">${totalOrders ? (totalAmount / totalOrders).toFixed(2) : "0.00"}</h3>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import {
//   FaClock,
//   FaCheckCircle,
//   FaUtensils,
//   FaUserTie,
//   FaTable,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import EmployeeNavbar from "./Navbar";

// export default function OrderPage() {
//   const [orders, setOrders] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   // Load employees
//   useEffect(() => {
//     const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
//     setEmployees(savedEmployees);
//   }, []);

//   // Load orders
//   useEffect(() => {
//     const loadOrders = () => {
//       let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//       const lastOrder = JSON.parse(localStorage.getItem("lastConfirmedOrder"));

//       if (lastOrder) {
//         const emp = employees.find((e) => e.id === lastOrder.employeeId);
//         lastOrder.orders.forEach((item) => {
//           savedOrders.push({
//             id: lastOrder.orderId,
//             table: lastOrder.customer.table,
//             server: emp ? emp.name : lastOrder.employee,
//             item: item.name,
//             qty: item.qty,
//             total: item.qty * parseFloat(item.price.replace("$", "")),
//             status: "Preparing",
//             placed: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             expected: new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//           });
//         });
//         localStorage.removeItem("lastConfirmedOrder");
//         localStorage.setItem("orders", JSON.stringify(savedOrders));
//       }

//       setOrders(savedOrders);
//     };

//     loadOrders();
//     const interval = setInterval(loadOrders, 2000);
//     return () => clearInterval(interval);
//   }, [employees]);

//   // Auto-update Preparing → Completed after 5 minutes (simulated here with 3s for testing)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setOrders((prev) => {
//         return prev.map((order) => {
//           if (order.status === "Preparing") {
//             // Move to history
//             const history = JSON.parse(localStorage.getItem("history")) || [];
//             history.push({
//               id: order.id,
//               item: order.item,
//               total: `$${order.total.toFixed(2)}`,
//               date: new Date().toLocaleDateString(),
//               employee: order.server,
//             });
//             localStorage.setItem("history", JSON.stringify(history));

//             return { ...order, status: "Completed" };
//           }
//           return order;
//         }).filter((o) => o.status !== "Completed"); // Remove completed from active orders
//       });
//     },);

//     return () => clearInterval(timer);
//   }, []);

//   // Helpers
//   const getProgressWidth = (status) => (status === "Preparing" ? "w-1/3" : "w-full");

//   const getStatusIcon = (status) =>
//     status === "Preparing" ? <FaClock className="text-yellow-400 text-2xl" /> :
//     <FaCheckCircle className="text-green-400 text-2xl" />;

//   const getColorClass = (status) => (status === "Preparing" ? "yellow" : "green");

//   const totalAmount = orders.reduce((sum, o) => sum + o.total, 0);
//   const totalOrders = orders.length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
//       <EmployeeNavbar />

//       {/* Page Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-10 p-8"
//       >
//         <h1 className="text-4xl font-extrabold tracking-wide">
//           In-Restaurant <span className="text-green-400">Orders</span>
//         </h1>
//         <p className="text-gray-400 mt-2 text-sm">
//           Monitor live kitchen status and serving progress
//         </p>
//       </motion.div>

//       {/* Orders Grid */}
//       <div className="grid md:grid-cols-3 gap-8 px-8">
//         {orders.map((order, idx) => {
//           const color = getColorClass(order.status);
//           return (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.2 }}
//               whileHover={{ scale: 1.03 }}
//               className="relative rounded-3xl border border-gray-800 p-6 bg-gray-900/50 
//                 backdrop-blur-xl shadow-lg shadow-black/40 overflow-hidden transition-transform duration-300
//                 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
//             >
//               <div className={`absolute top-0 left-0 right-0 h-[3px] ${color === "yellow" ? "bg-yellow-400" : "bg-green-400"}`} />
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-gray-400 text-sm font-light">{order.id}</p>
//                 <span className={`px-3 py-1 text-xs rounded-full ${color === "yellow" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"} font-semibold`}>
//                   {order.status}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center mb-4 text-gray-400 text-sm">
//                 <div className="flex items-center gap-2">
//                   <FaTable className="text-gray-500" />
//                   <span className="text-gray-300 font-medium">{order.table}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaUserTie className="text-gray-500" />
//                   <span className="text-gray-300 font-medium">{order.server}</span>
//                 </div>
//               </div>

//               <h2 className="text-2xl font-semibold mb-2">{order.item}</h2>
//               <p className="text-gray-400 mb-2 text-sm">
//                 Quantity: <span className="text-gray-200 font-medium">{order.qty}</span>
//               </p>

//               <div className="flex justify-between text-xs text-gray-400 mb-4">
//                 <p>⏱ Placed: <span className="text-gray-200 font-medium">{order.placed}</span></p>
//                 <p>🍴 Expected: <span className="text-gray-200 font-medium">{order.expected}</span></p>
//               </div>

//               <div className="w-full h-2 bg-gray-800 rounded-full mb-5 overflow-hidden">
//                 <div className={`h-full ${getProgressWidth(order.status)} ${color === "yellow" ? "bg-yellow-400/80" : "bg-green-400/80"} rounded-full transition-all duration-700`} />
//               </div>

//               <div className="flex justify-between items-center mt-4">
//                 {/* <span className="text-xl font-bold text-green-400">${order.total.toFixed(2)}</span> */}
//                 {getStatusIcon(order.status)}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Bill Summary */}
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.8 }}
//         className="mt-16 px-8 pb-16"
//       >
//         <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-xl p-8 text-center">
//           <h2 className="text-3xl font-bold mb-6 text-green-400">Bill Summary</h2>

//           <div className="grid md:grid-cols-3 gap-6 text-gray-300">
//             <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/60 rounded-2xl p-4 shadow-inner">
//               <p className="text-sm text-gray-400">Total Orders</p>
//               <h3 className="text-2xl font-bold text-white mt-1">{totalOrders}</h3>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/60 rounded-2xl p-4 shadow-inner">
//               <p className="text-sm text-gray-400">Total Revenue</p>
//               <h3 className="text-2xl font-bold text-green-400 mt-1">${totalAmount.toFixed(2)}</h3>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/60 rounded-2xl p-4 shadow-inner">
//               <p className="text-sm text-gray-400">Avg. Order Value</p>
//               <h3 className="text-2xl font-bold text-blue-400 mt-1">${totalOrders ? (totalAmount / totalOrders).toFixed(2) : "0.00"}</h3>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaUserTie, FaTable } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import EmployeeNavbar from "./Navbar";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);

  // Load employees
  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(savedEmployees);
  }, []);

  // Load lastConfirmedOrder and queue it
  useEffect(() => {
    const loadNewOrders = () => {
      const lastOrder = JSON.parse(localStorage.getItem("lastConfirmedOrder"));
      if (lastOrder) {
        const emp = employees.find((e) => e.id === lastOrder.employeeId);

        const newEntries = (lastOrder.orders ?? []).map((item) => ({
          id: lastOrder.orderId,
          table: lastOrder.customer?.table || "N/A",
          server: emp ? emp.name : lastOrder.employee || "Unknown",
          item: item.name,
          qty: item.qty,
          total: item.qty * parseFloat(item.price?.replace("$", "") || 0),
          status: "Preparing",
          placed: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          expected: new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

        setPendingQueue((prev) => [...prev, ...newEntries]);
        localStorage.removeItem("lastConfirmedOrder");
      }
    };

    loadNewOrders();
    const interval = setInterval(loadNewOrders, 5000);
    return () => clearInterval(interval);
  }, [employees]);

  // Pop orders from pendingQueue one by one every 1 second
  useEffect(() => {
    if (pendingQueue.length === 0) return;
    const interval = setInterval(() => {
      setPendingQueue((queue) => {
        const nextOrder = queue[0];
        if (nextOrder) setOrders((prev) => [...prev, nextOrder]);
        return queue.slice(1);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pendingQueue]);

  // Auto-move "Preparing" → "Completed" after 3s (demo)
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) => {
        const updatedOrders = [];
        const history = JSON.parse(localStorage.getItem("history")) || [];

        prev.forEach((order) => {
          if (order.status === "Preparing") {
            history.push({
              id: order.id,
              item: order.item,
              total: `$${order.total.toFixed(2)}`,
              date: new Date().toLocaleDateString(),
              employee: order.server,
            });
          } else {
            updatedOrders.push(order);
          }
        });

        localStorage.setItem("history", JSON.stringify(history));
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Helpers
  const getProgressWidth = (status) => (status === "Preparing" ? "w-1/3" : "w-full");
  const getStatusIcon = () => <FaCheckCircle className="text-[#ae8c72] text-2xl" />; // pastel accent
  const progressColor = "bg-[#ae8c72]/80"; // pastel accent for progress bar

  const totalAmount = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b]">
      <EmployeeNavbar />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 p-8"
      >
        <h1 className="text-4xl font-extrabold tracking-wide">
          In-Restaurant <span className="text-[#ae8c72]">Orders</span>
        </h1>
        <p className="text-[#04040b]/70 mt-2 text-sm">
          Monitor live kitchen status and serving progress
        </p>
      </motion.div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-3 gap-8 px-8">
        {orders.length === 0 ? (
          <p className="text-center text-[#04040b]/50 col-span-3 mt-10">No active orders 🍽️</p>
        ) : (
          <AnimatePresence>
            {orders.map((order, idx) => (
              <motion.div
                key={order.id + order.item + idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-3xl border border-[#ae8c72] p-6 bg-white/70 shadow-lg shadow-[#ae8c72]/20 overflow-hidden transition-transform duration-300"
              >
                <div className={`absolute top-0 left-0 right-0 h-[3px] ${progressColor}`} />
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[#04040b]/70 text-sm font-light">{order.id}</p>
                  <span className={`px-3 py-1 text-xs rounded-full bg-[#ae8c72]/20 text-[#ae8c72] font-semibold`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4 text-[#04040b]/70 text-sm">
                  <div className="flex items-center gap-2">
                    <FaTable className="text-[#04040b]/50" />
                    <span className="font-medium">{order.table}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserTie className="text-[#04040b]/50" />
                    <span className="font-medium">{order.server}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-2">{order.item}</h2>
                <p className="text-[#04040b]/70 mb-2 text-sm">
                  Quantity: <span className="font-medium">{order.qty}</span>
                </p>

                <div className="flex justify-between text-xs text-[#04040b]/50 mb-4">
                  <p>⏱ Placed: <span className="font-medium">{order.placed}</span></p>
                  <p>🍴 Expected: <span className="font-medium">{order.expected}</span></p>
                </div>

                <div className="w-full h-2 bg-[#dfc9b8]/50 rounded-full mb-5 overflow-hidden">
                  <div className={`h-full ${getProgressWidth(order.status)} ${progressColor} rounded-full transition-all duration-700`} />
                </div>

                <div className="flex justify-end items-center mt-4">{getStatusIcon()}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Bill Summary */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 px-8 pb-16"
      >
        <div className="max-w-4xl mx-auto bg-white/70 rounded-3xl border border-[#ae8c72] shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#ae8c72]">Bill Summary</h2>
          <div className="grid md:grid-cols-3 gap-6 text-[#04040b]">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/60 rounded-2xl p-4 shadow-inner">
              <p className="text-sm text-[#04040b]/70">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{totalOrders}</h3>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/60 rounded-2xl p-4 shadow-inner">
              <p className="text-sm text-[#04040b]/70">Total Revenue</p>
              <h3 className="text-2xl font-bold text-[#ae8c72] mt-1">${totalAmount.toFixed(2)}</h3>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/60 rounded-2xl p-4 shadow-inner">
              <p className="text-sm text-[#04040b]/70">Avg. Order Value</p>
              <h3 className="text-2xl font-bold text-[#dfc9b8] mt-1">${totalOrders ? (totalAmount / totalOrders).toFixed(2) : "0.00"}</h3>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
