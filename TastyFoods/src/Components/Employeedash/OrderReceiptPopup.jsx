import React, { useRef } from "react";
import { FaUtensils, FaDownload, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderReceiptPopup({ show, onClose }) {
  const receiptRef = useRef();

  const handleDownload = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("TastyFoods_Receipt.pdf");
  };

  const currentDate = new Date().toLocaleString();

  const orderDetails = {
    orderId: "ORD-2045",
    customer: "Khushboo",
    table: "T12",
    total: "$47.05",
    payment: "UPI",
    items: [
      { name: "Mexican Tacos", qty: 2, price: "$12.77" },
      { name: "Submarine Sandwich", qty: 2, price: "$19.46" },
      { name: "Garlic Toast", qty: 2, price: "$8.69" },
    ],
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={receiptRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-black w-[400px] rounded-3xl p-6 shadow-2xl border-4 border-green-500 relative"
          >
            {/* Header */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaUtensils className="text-green-600 text-2xl" />
                <h1 className="text-2xl font-extrabold text-green-700">
                  TastyFOODS
                </h1>
              </div>
              <p className="text-xs text-gray-500">
                "Serving Freshness Everyday!"
              </p>
              <p className="text-xs text-gray-500 mt-1">{currentDate}</p>
            </div>

            {/* Order Info */}
            <div className="text-sm mb-4 border-t border-b border-gray-300 py-2">
              <p>
                <strong>Order ID:</strong> {orderDetails.orderId}
              </p>
              <p>
                <strong>Customer:</strong> {orderDetails.customer}
              </p>
              <p>
                <strong>Table No:</strong> {orderDetails.table}
              </p>
              <p>
                <strong>Payment:</strong> {orderDetails.payment}
              </p>
            </div>

            {/* Items */}
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left">Item</th>
                  <th>Qty</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td>{item.name}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-right">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="text-sm border-t border-gray-300 pt-2">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>$40.92</span>
              </p>
              <p className="flex justify-between">
                <span>Service (10%):</span>
                <span>$4.09</span>
              </p>
              <p className="flex justify-between">
                <span>GST (5%):</span>
                <span>$2.04</span>
              </p>
              <p className="flex justify-between font-semibold text-green-700">
                <span>Total:</span>
                <span>{orderDetails.total}</span>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-5 text-center text-gray-500 text-xs border-t border-gray-300 pt-3">
              <p>Thank you for dining with us 🍽️</p>
              <p>Visit again — TastyFOODS Restaurant</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="absolute bottom-10 flex gap-4">
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700"
            >
              OK
            </button>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              <FaDownload /> Download PDF
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
