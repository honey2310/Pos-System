// src/features/customers/CustomerPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  deleteCustomer,
  updateCustomer,
} from "../../Slices/Md/CustomerSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import ManagerNavbar from "../Managerdash/ManagerNavbar";

export default function CustomerPage() {
  const dispatch = useDispatch();
  const { items: customers, status } = useSelector((state) => state.customers);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // 🗑️ Delete
  const handleDelete = (cust) => {
    setSelectedCustomer(cust);
    setShowDelete(true);
  };
  const confirmDelete = () => {
    dispatch(deleteCustomer(selectedCustomer.id));
    setShowDelete(false);
    setSelectedCustomer(null);
  };

  // ✏️ Edit
  const handleEdit = (cust) => {
    setSelectedCustomer(cust);
    setFormData({
      name: cust.name,
      phone: cust.phone,
      address: cust.address,
    });
    setShowEdit(true);
  };
  const confirmEdit = () => {
    dispatch(
      updateCustomer({
        ...selectedCustomer,
        ...formData,
      })
    );
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      <ManagerNavbar />
      <div className="p-6 pt-40">
        <h1 className="text-3xl font-bold text-red-400 mb-6">
          👥 Customer Details
        </h1>

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error loading customers</p>}

        <div className="overflow-x-auto bg-gray-900/60 border border-gray-800 rounded-3xl shadow-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-red-400 text-left">
                <th className="p-4">Order ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust, i) => (
                <motion.tr
                  key={cust.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-gray-800 hover:bg-gray-800/60"
                >
                  <td className="p-4">{cust.orderId}</td>
                  <td className="p-4 font-semibold">{cust.name}</td>
                  <td className="p-4">{cust.orders}</td>
                  <td className="p-4">{cust.phone}</td>
                  <td className="p-4">{cust.address}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(cust)}
                      className="text-blue-400 hover:text-blue-500 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(cust)}
                      className="text-red-400 hover:text-red-500 text-xl"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🗑️ Delete Confirmation Popup */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 text-center max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                Delete Customer
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">
                  {selectedCustomer?.name}
                </span>
                ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDelete(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✏️ Edit Popup */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 text-center max-w-lg w-full"
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-5">
                Edit Customer
              </h2>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Address
                  </label>
                  <textarea
                    rows="2"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={confirmEdit}
                  className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg font-semibold text-black"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowEdit(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold text-white"
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
