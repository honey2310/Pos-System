// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaUserTie,
//   FaUsers,
//   FaDollarSign,
//   FaUtensils,
//   FaChartLine,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
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
// import ManagerNavbar from "./ManagerNavbar";

// export default function ManagerDashboard() {
//   const [selectedEmployee, setSelectedEmployee] = useState("All");
//   const [dateRange, setDateRange] = useState("Monthly");

//   const [summaryData, setSummaryData] = useState({
//     totalEmployees: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     totalCustomers: 0,
//   });

//   const [allSalesData, setAllSalesData] = useState([]);
//   const [salesData, setSalesData] = useState([]);
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [topEmployees, setTopEmployees] = useState([]);
//   const [topDishes, setTopDishes] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [reportsRes, employeesRes, customersRes, ordersRes] =
//           await Promise.all([
//             axios.get("http://localhost:3000/reports"),
//             axios.get("http://localhost:3000/employees"),
//             axios.get("http://localhost:3000/customers"),
//             axios.get("http://localhost:3000/orders"),
//           ]);

//         const reports = reportsRes.data;
//         setSummaryData({
//           totalEmployees: reports.totalEmployees,
//           totalOrders: reports.totalOrders,
//           totalRevenue: reports.totalRevenue,
//           totalCustomers: customersRes.data.length,
//         });

//         setAllSalesData(
//           reports.salesTrends.map((item) => ({
//             name: item.date,
//             sales: item.total,
//           }))
//         );

//         setTopDishes(
//           reports.topSellingDishes.map((d) => ({
//             name: d.name,
//             sold: d.orders,
//           }))
//         );

//         setAllEmployees(employeesRes.data);
//         setTopEmployees(
//           [...employeesRes.data]
//             .sort((a, b) => b.totalOrders - a.totalOrders)
//             .slice(0, 5)
//             .map((emp) => ({ name: emp.name, orders: emp.totalOrders }))
//         );

//         setCustomers(customersRes.data);
//         setOrders(ordersRes.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Filter sales by employee
//   useEffect(() => {
//     if (selectedEmployee === "All") {
//       setSalesData(allSalesData);
//     } else {
//       const empOrders = orders.filter(
//         (o) => o.employeeName === selectedEmployee
//       );
//       const grouped = {};
//       empOrders.forEach((o) => {
//         grouped[o.date] = (grouped[o.date] || 0) + o.total;
//       });
//       setSalesData(
//         Object.entries(grouped).map(([date, total]) => ({
//           name: date,
//           sales: total,
//         }))
//       );
//     }
//   }, [selectedEmployee, allSalesData, orders]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
//       <ManagerNavbar />

//       {/* Filters */}
//       <div className="p-6 flex flex-wrap justify-between items-center gap-4 border-b border-[#ae8c72] pt-45">
//         <h1 className="text-2xl font-bold text-[#04040b]">
//           Manager Dashboard 👨‍💼
//         </h1>

//         <div className="flex gap-4">
//           <select
//             className="bg-[#dfc9b8]/50 border border-[#ae8c72] rounded-lg px-4 py-2 text-sm text-[#04040b] focus:outline-none focus:border-[#ae8c72]"
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//           >
//             <option>All</option>
//             {allEmployees.map((emp) => (
//               <option key={emp.id}>{emp.name}</option>
//             ))}
//           </select>

//           <select
//             className="bg-[#dfc9b8]/50 border border-[#ae8c72] rounded-lg px-4 py-2 text-sm text-[#04040b] focus:outline-none focus:border-[#ae8c72]"
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//           >
//             <option>Daily</option>
//             <option>Weekly</option>
//             <option>Monthly</option>
//           </select>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[
//           {
//             title: "Total Employees",
//             value: summaryData.totalEmployees,
//             icon: <FaUserTie />,
//             color: "from-[#f7f0fd] to-[#ae8c72]",
//           },
//           {
//             title: "Total Orders",
//             value: summaryData.totalOrders,
//             icon: <FaUtensils />,
//             color: "from-[#dfc9b8] to-[#ae8c72]",
//           },
//           {
//             title: "Total Revenue",
//             value: `$${summaryData.totalRevenue.toLocaleString()}`,
//             icon: <FaDollarSign />,
//             color: "from-[#f7f0fd] to-[#dfc9b8]",
//           },
//           {
//             title: "Customers Served",
//             value: summaryData.totalCustomers,
//             icon: <FaUsers />,
//             color: "from-[#dfc9b8] to-[#ae8c72]",
//           },
//         ].map((card, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className={`p-6 rounded-3xl bg-gradient-to-br ${card.color} text-[#04040b] shadow-lg flex items-center justify-between`}
//           >
//             <div>
//               <p className="text-sm opacity-80">{card.title}</p>
//               <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
//             </div>
//             <div className="text-3xl opacity-70">{card.icon}</div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Sales Trend */}
//         <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <FaChartLine className="text-[#ae8c72]" /> {dateRange} Sales Trends
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={salesData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
//               <XAxis dataKey="name" stroke="#04040b" />
//               <YAxis stroke="#04040b" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#f7f0fd",
//                   border: "1px solid #ae8c72",
//                   color: "#04040b",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#ae8c72"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Top Employees */}
//         <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <FaUsers className="text-[#ae8c72]" /> Top Performing Employees
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={topEmployees}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
//               <XAxis dataKey="name" stroke="#04040b" />
//               <YAxis stroke="#04040b" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#f7f0fd",
//                   border: "1px solid #ae8c72",
//                   color: "#04040b",
//                 }}
//               />
//               <Bar dataKey="orders" fill="#ae8c72" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Top Selling Dishes */}
//       <div className="p-6">
//         <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <FaUtensils className="text-[#ae8c72]" /> Best Selling Dishes
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             {topDishes.map((dish, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-[#dfc9b8]/50 rounded-2xl p-4 text-center border border-[#ae8c72]"
//               >
//                 <h4 className="font-semibold">{dish.name}</h4>
//                 <p className="text-[#04040b] mt-1">{dish.sold} sold</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/ManagerDashboard.jsx
// src/pages/ManagerDashboard.jsx
// src/pages/ManagerDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  FaUserTie,
  FaUsers,
  FaDollarSign,
  FaUtensils,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import ManagerNavbar from "./ManagerNavbar";

export default function ManagerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reports, setReports] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState({ name: "All" });
  const [chartData, setChartData] = useState([]);
  const [lineColor, setLineColor] = useState("#ae8c72");
  const [topEmployees, setTopEmployees] = useState([]);
  const [topDishes, setTopDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, custRes, repRes] = await Promise.all([
          axios.get("http://localhost:3000/employees"),
          axios.get("http://localhost:3000/customers"),
          axios.get("http://localhost:3000/reports"),
        ]);

        setEmployees(empRes.data);
        setCustomers(custRes.data);
        setReports(repRes.data);

        // Top Employees
        const topEmps = [...empRes.data]
          .sort((a, b) => b.totalOrders - a.totalOrders)
          .slice(0, 5)
          .map((e) => ({ name: e.name, orders: e.totalOrders }));
        setTopEmployees(topEmps);

        // Top Dishes
        const topD =
          repRes.data.topSellingDishes?.map((d) => ({
            name: d.name,
            sold: d.orders,
          })) || [];
        setTopDishes(topD);

        // Default chart data = overall sales
        setChartData(
          repRes.data.salesTrends?.map((s) => ({
            name: s.date,
            sales: s.total,
          })) || []
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Update chart when employee selection changes
  useEffect(() => {
    if (!reports) return;

    if (selectedEmployee.name === "All") {
      setChartData(
        reports.salesTrends?.map((s) => ({ name: s.date, sales: s.total })) ||
          []
      );
      setLineColor("#ae8c72");
    } else {
      const empSales = reports.employeeSales?.[selectedEmployee.name] || [];
      setChartData(empSales.map((s) => ({ name: s.date, sales: s.total })));

      const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];
      const empIndex = employees.findIndex(
        (e) => e.name === selectedEmployee.name
      );
      setLineColor(colors[empIndex % colors.length]);
    }
  }, [selectedEmployee, reports, employees]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
      <ManagerNavbar />

      {/* Header */}
      <div className="p-6 flex flex-wrap justify-between items-center gap-4 border-b border-[#ae8c72] mt-35">
        <h1 className="text-2xl font-bold text-[#04040b]">
          Manager Dashboard 👨‍💼
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Employees",
            value: reports.totalEmployees,
            icon: <FaUserTie />,
            color: "from-[#f7f0fd] to-[#ae8c72]",
          },
          {
            title: "Total Orders",
            value: reports.totalOrders,
            icon: <FaUtensils />,
            color: "from-[#dfc9b8] to-[#ae8c72]",
          },
          {
            title: "Total Revenue",
            value: `$${reports.totalRevenue}`,
            icon: <FaDollarSign />,
            color: "from-[#f7f0fd] to-[#dfc9b8]",
          },
          {
            title: "Customers Served",
            value: customers.length,
            icon: <FaUsers />,
            color: "from-[#dfc9b8] to-[#ae8c72]",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl bg-gradient-to-br ${card.color} text-[#04040b] shadow-lg flex items-center justify-between`}
          >
            <div>
              <p className="text-sm opacity-80">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
            </div>
            <div className="text-3xl opacity-70">{card.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Employees */}
      <h2 className="text-2xl font-bold mb-4 text-[#ae8c72] px-6">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 mb-8">
        {/* "All" card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`p-4 bg-white/90 rounded-2xl shadow-md cursor-pointer ${
            selectedEmployee.name === "All" ? "border-2 border-[#ae8c72]" : ""
          }`}
          onClick={() => setSelectedEmployee({ name: "All" })}
        >
          <div className="text-center mb-2 text-yellow-500">
            <FaStar />
          </div>
          <h3 className="font-semibold text-lg text-center">All Employees</h3>
        </motion.div>

        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            whileHover={{ scale: 1.03 }}
            className={`p-4 bg-white/90 rounded-2xl shadow-md cursor-pointer ${
              selectedEmployee.name === emp.name
                ? "border-2 border-[#ae8c72]"
                : ""
            }`}
            onClick={() => setSelectedEmployee(emp)}
          >
            <div className="text-center mb-2 text-yellow-500">
              <FaStar />
            </div>
            <img
              src={emp.img}
              alt={emp.name}
              className="w-20 h-20 rounded-full mb-3 mx-auto"
            />
            <h3 className="font-semibold text-lg text-center">{emp.name}</h3>
            <p className="text-sm text-center">{emp.role}</p>
            <p className="text-sm text-center">Orders: {emp.totalOrders}</p>
            <p className="text-sm text-center">Sales: ${emp.totalSales}</p>
          </motion.div>
        ))}
      </div>

      {/* Sales Trend */}
      <h2 className="text-2xl font-bold mb-4 text-[#ae8c72] px-6">
        {selectedEmployee.name === "All"
          ? "Overall Sales Trend"
          : `${selectedEmployee.name}'s Sales Trend`}
      </h2>
      <div className="p-6 bg-white/80 rounded-2xl shadow-md mb-8 mx-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
            <XAxis dataKey="name" stroke="#04040b" />
            <YAxis stroke="#04040b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f7f0fd",
                border: "1px solid #ae8c72",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke={lineColor}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Employees & Dishes */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Employees */}
        <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaUsers className="text-[#ae8c72]" /> Top Employees
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topEmployees}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ae8c72" />
              <XAxis dataKey="name" stroke="#04040b" />
              <YAxis stroke="#04040b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f7f0fd",
                  border: "1px solid #ae8c72",
                }}
              />
              <Bar dataKey="orders" fill="#ae8c72" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Dishes */}
        <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaUtensils className="text-[#ae8c72]" /> Top Selling Dishes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {topDishes.map((dish, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-[#dfc9b8]/50 rounded-2xl p-4 text-center border border-[#ae8c72]"
              >
                <h4 className="font-semibold">{dish.name}</h4>
                <p className="text-[#04040b] mt-1">{dish.sold} sold</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
