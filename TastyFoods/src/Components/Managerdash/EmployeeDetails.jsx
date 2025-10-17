import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import ManagerNavbar from "./ManagerNavbar";

export default function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      contact: "",
      salary: "",
      email: "",
      totalSales: 0,
      totalOrders: 0,
      img: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      axios
        .put(`http://localhost:3000/employees/${editingEmployee.id}`, formData)
        .then(() => {
          fetchEmployees();
          setFormOpen(false);
          setEditingEmployee(null);
          resetForm();
        });
    } else {
      axios.post("http://localhost:3000/employees", formData).then(() => {
        fetchEmployees();
        setFormOpen(false);
        resetForm();
      });
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setFormData({ ...emp });
    setFormOpen(true);
  };

  const handleDelete = (emp) => {
    setSelectedEmployee(emp);
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3000/employees/${selectedEmployee.id}`)
      .then(() => {
        fetchEmployees();
        setDeletePopup(false);
        setSelectedEmployee(null);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
      <ManagerNavbar />

      <div className="p-40">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4b3b2a]">Employee Details 👨‍🍳</h1>
          <button
            onClick={() => {
              setFormOpen(true);
              setEditingEmployee(null);
              resetForm();
            }}
            className="bg-[#ae8c70] hover:bg-[#9b7c63] text-white px-5 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Add Employee
          </button>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((emp, index) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 border border-[#dfc9b8] rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-24 h-24 rounded-full border-2 border-[#ae8c70] object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#4b3b2a]">{emp.name}</h2>
                  <p className="text-[#6a5645]">{emp.role}</p>
                  <p className="text-[#6a5645]">{emp.contact}</p>
                  <p className="text-[#6a5645]">{emp.email}</p>
                </div>

                <div className="flex flex-col gap-2 text-center">
                  <div className="bg-[#f7f0fd] rounded-2xl p-3 border border-[#dfc9b8]">
                    <p className="text-sm text-[#6a5645]">Total Orders</p>
                    <p className="font-semibold text-[#ae8c70]">{emp.totalOrders}</p>
                  </div>
                  <div className="bg-[#f7f0fd] rounded-2xl p-3 border border-[#dfc9b8]">
                    <p className="text-sm text-[#6a5645]">Total Sales</p>
                    <p className="font-semibold text-[#ae8c70]">${emp.totalSales}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <FaEdit
                  onClick={() => handleEdit(emp)}
                  className="cursor-pointer text-[#7a6958] hover:text-[#ae8c70] transition"
                />
                <FaTrash
                  onClick={() => handleDelete(emp)}
                  className="cursor-pointer text-[#7a6958] hover:text-[#ae8c70] transition"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 border border-[#dfc9b8] rounded-3xl p-8 w-[90%] md:w-[60%] lg:w-[40%] shadow-2xl relative"
            >
              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-4 right-4 text-[#7a6958] hover:text-[#ae8c70] transition"
              >
                <FaTimes size={20} />
              </button>

              <h2 className="text-2xl font-bold text-[#4b3b2a] mb-6 text-center">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 rounded-lg bg-white border border-[#dfc9b8] focus:ring-2 focus:ring-[#ae8c70]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="p-2 rounded-lg bg-white border border-[#dfc9b8] focus:ring-2 focus:ring-[#ae8c70]"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Contact"
                  className="p-2 rounded-lg bg-white border border-[#dfc9b8] focus:ring-2 focus:ring-[#ae8c70]"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded-lg bg-white border border-[#dfc9b8] focus:ring-2 focus:ring-[#ae8c70]"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Salary"
                  className="p-2 rounded-lg bg-white border border-[#dfc9b8] focus:ring-2 focus:ring-[#ae8c70]"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: Number(e.target.value),
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="p-2 rounded-lg bg-white border border-[#dfc9b8] focus:ring-2 focus:ring-[#ae8c70]"
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
                  }
                  required
                />

                <button
                  type="submit"
                  className="col-span-full bg-[#ae8c70] hover:bg-[#9b7c63] text-white px-4 py-2 rounded-lg mt-2 transition-transform transform hover:scale-105"
                >
                  {editingEmployee ? "Update Employee" : "Add Employee"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deletePopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 border border-[#dfc9b8] rounded-3xl p-8 shadow-2xl text-center w-[90%] md:w-[30rem]"
            >
              <h2 className="text-2xl font-bold text-[#4b3b2a] mb-4">
                Delete Employee
              </h2>
              <p className="text-[#6a5645] mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#4b3b2a]">
                  {selectedEmployee?.name}
                </span>
                ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-[#ae8c70] hover:bg-[#9b7c63] text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeletePopup(false)}
                  className="bg-[#dfc9b8] hover:bg-[#d3bfae] text-[#4b3b2a] px-6 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
