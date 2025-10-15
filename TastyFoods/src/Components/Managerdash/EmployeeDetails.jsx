import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import ManagerNavbar from "./ManagerNavbar";

export default function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contact: "",
    salary: "",
    email: "",
    totalSales: 0,
    totalOrders: 0,
    img: "",
  });

  const fetchEmployees = () => {
    axios
      .get("http://localhost:3000/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      axios
        .put(`http://localhost:3000/employees/${editingEmployee.id}`, formData)
        .then(() => {
          fetchEmployees();
          setFormOpen(false);
          setEditingEmployee(null);
          setFormData({
            name: "",
            role: "",
            contact: "",
            salary: 0,
            email: "",
            totalSales: 0,
            totalOrders: 0,
            img: "",
          });
        });
    } else {
      axios.post("http://localhost:3000/employees", formData).then(() => {
        fetchEmployees();
        setFormOpen(false);
        setFormData({
          name: "",
          role: "",
          contact: "",
          salary: 0,
          email: "",
          totalSales: 0,
          totalOrders: 0,
          img: "",
        });
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`http://localhost:3000/employees/${id}`).then(() => {
        fetchEmployees();
      });
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setFormData({ ...emp });
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <ManagerNavbar />

      <div className="p-40">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-400">Employee Details 👨‍🍳</h1>
          <button
            onClick={() => {
              setFormOpen(!formOpen);
              setEditingEmployee(null);
              setFormData({
                name: "",
                role: "",
                contact: "",
                salary: 0,
                email: "",
                totalSales: 0,
                totalOrders: 0,
                img: "",
              });
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            {formOpen ? "Close Form" : "Add Employee"}
          </button>
        </div>

        {/* Add/Edit Form */}
        {formOpen && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name"
              className="p-2 rounded-lg bg-gray-800 border border-gray-700"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Role"
              className="p-2 rounded-lg bg-gray-800 border border-gray-700"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Contact"
              className="p-2 rounded-lg bg-gray-800 border border-gray-700"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded-lg bg-gray-800 border border-gray-700"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Salary"
              className="p-2 rounded-lg bg-gray-800 border border-gray-700"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="p-2 rounded-lg bg-gray-800 border border-gray-700"
              value={formData.img}
              onChange={(e) => setFormData({ ...formData, img: e.target.value })}
              required
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg col-span-full"
            >
              {editingEmployee ? "Update Employee" : "Add Employee"}
            </button>
          </motion.form>
        )}

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((emp, index) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-6">
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-24 h-24 rounded-full border-2 border-red-500 object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{emp.name}</h2>
                  <p className="text-gray-400">{emp.role}</p>
                  <p className="text-gray-400">{emp.contact}</p>
                  <p className="text-gray-400">{emp.email}</p>
                </div>

                <div className="flex flex-col gap-2 text-center">
                  <div className="bg-gray-800 rounded-2xl p-3">
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <p className="text-green-400 font-bold">{emp.totalOrders}</p>
                  </div>
                  <div className="bg-gray-800 rounded-2xl p-3">
                    <p className="text-gray-400 text-sm">Total Sales</p>
                    <p className="text-yellow-400 font-bold">${emp.totalSales}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <FaEdit
                  onClick={() => handleEdit(emp)}
                  className="cursor-pointer text-blue-400 hover:text-blue-500"
                />
                <FaTrash
                  onClick={() => handleDelete(emp.id)}
                  className="cursor-pointer text-red-400 hover:text-red-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
