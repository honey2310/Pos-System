// src/features/customers/CustomerPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  deleteCustomer,
  updateCustomer,
} from "../../Slices/Md/CustomerSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTimes } from "react-icons/fa";
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
    dispatch(updateCustomer({ ...selectedCustomer, ...formData }));
    setShowEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
      <ManagerNavbar />

      <div className="p-6 pt-36 max-w-7xl mx-auto w-full mt-20">
        <h1 className="text-3xl font-bold text-center mb-10">
          👥 Customer Details
        </h1>

        {status === "loading" && (
          <p className="text-center text-lg">Loading customers...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-lg text-red-500">
            Error loading customers.
          </p>
        )}

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((cust, i) => (
            <motion.div
              key={cust.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-[#ae8c70]/30 hover:shadow-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{cust.name}</h2>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Order ID:</span>{" "}
                  {cust.orderId}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Orders:</span> {cust.orders}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Phone:</span> {cust.phone}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Address:</span>{" "}
                  {cust.address}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(cust)}
                  className="text-[#4a3f35] bg-[#dfc9b8] hover:bg-[#cdb29f] px-4 py-2 rounded-xl font-medium transition-all"
                >
                  <FaEdit className="inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cust)}
                  className="text-[#f7f0fd] bg-[#ae8c70] hover:bg-[#946e55] px-4 py-2 rounded-xl font-medium transition-all"
                >
                  <FaTimes className="inline mr-1" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🗑️ Delete Popup */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/90 rounded-2xl p-8 shadow-2xl border border-[#ae8c70]/30 text-center max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-3">Delete Customer</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedCustomer?.name}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-[#ae8c70] hover:bg-[#946e55] text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDelete(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg font-semibold"
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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/90 rounded-2xl p-8 shadow-2xl border border-[#ae8c70]/30 max-w-lg w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Edit Customer
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-[#f7f0fd] border border-[#dfc9b8] focus:outline-none focus:ring-2 focus:ring-[#ae8c70]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-[#f7f0fd] border border-[#dfc9b8] focus:outline-none focus:ring-2 focus:ring-[#ae8c70]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <textarea
                    rows="2"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-[#f7f0fd] border border-[#dfc9b8] focus:outline-none focus:ring-2 focus:ring-[#ae8c70]"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={confirmEdit}
                  className="bg-[#dfc9b8] hover:bg-[#cdb29f] px-6 py-2 rounded-lg font-semibold text-[#04040b]"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowEdit(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg font-semibold text-[#04040b]"
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
