import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ManagerNavbar from "./ManagerNavbar";
import { FaPrint } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PendingOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const invoiceRef = useRef();

  // 🧠 Load all orders from localStorage (saved by employees)
  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    };

    loadOrders(); // Initial load

    // Optional: live updates if employee places new order
    window.addEventListener("storage", loadOrders);
    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  // 🧾 Handle print invoice as PDF
  const handlePrint = async () => {
    if (!invoiceRef.current) return;

    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${selectedOrder?.orderId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      <ManagerNavbar />

      <div className="pt-40 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE - Order List */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">All Orders</h2>

          <div className="flex flex-col gap-5 max-h-[75vh] overflow-y-auto pr-2">
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                No orders yet 😴
              </p>
            ) : (
              orders.map((order) => {
                const total = order.orders.reduce(
                  (sum, i) =>
                    sum + i.qty * parseFloat(i.price.replace("$", "")),
                  0
                );

                return (
                  <motion.div
                    key={order.orderId}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedOrder(order)}
                    className={`cursor-pointer rounded-2xl p-5 transition-all ${
                      selectedOrder?.orderId === order.orderId
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Order #{order.orderId}
                      </h3>
                      <span className="text-sm font-semibold text-green-400">
                        {order.paymentMode}
                      </span>
                    </div>

                    <div className="mt-1 text-sm">
                      Table: {order.customer.table} | Customer:{" "}
                      {order.customer.name}
                    </div>

                    {/* Item Previews */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {order.orders.slice(0, 2).map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-2 py-1 text-xs"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          {item.name}
                        </div>
                      ))}
                      {order.orders.length > 2 && (
                        <span className="text-xs text-gray-300">+ more</span>
                      )}
                    </div>

                    <div className="text-right font-bold mt-3 text-yellow-400">
                      ₹{total.toFixed(2)}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Order Details */}
        <div
          ref={invoiceRef}
          className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 shadow-lg flex flex-col"
        >
          {selectedOrder ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  Order #{selectedOrder.orderId}
                </h2>
                <span className="font-semibold text-green-400">
                  {selectedOrder.paymentMode}
                </span>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 text-sm text-gray-400 border-b border-gray-700 pb-3 mb-6">
                <p>Customer: {selectedOrder.customer.name}</p>
                <p>Phone: {selectedOrder.customer.phone}</p>
                <p>Table: {selectedOrder.customer.table}</p>
              </div>

              {/* Item List */}
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[45vh] pr-1">
                {selectedOrder.orders.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="text-yellow-400 font-semibold text-lg">
                      ₹{(item.qty * parseFloat(item.price.replace("$", ""))).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 flex justify-between items-center text-xl font-bold text-yellow-400 border-t border-gray-700 pt-4">
                <span>Total Amount</span>
                <span>
                  ₹
                  {selectedOrder.orders
                    .reduce(
                      (sum, i) =>
                        sum + i.qty * parseFloat(i.price.replace("$", "")),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <FaPrint /> Print Invoice
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-center mt-20 text-lg">
              Select an order to view its details 📋
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
