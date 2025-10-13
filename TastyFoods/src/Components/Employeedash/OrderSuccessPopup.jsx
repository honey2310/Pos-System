import React, { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderSuccessPopup({ show, onClose }) {
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef(null);

  // ✅ Download as PDF
  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Order_Receipt.pdf");
  };

  // ✅ Print the receipt
  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #16a34a; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f4f4f4; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <AnimatePresence>
      {show && !showReceipt && (
        // ✅ Original animated confirmation popup
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-2xl max-w-sm w-full"
          >
            <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-400 mb-6">
              Your order has been successfully placed and sent to the kitchen 🍽️
            </p>
            <button
              onClick={() => setShowReceipt(true)}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-full transition"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}

      {show && showReceipt && (
        // ✅ Animated receipt popup
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            ref={receiptRef}
            className="bg-white text-black rounded-3xl shadow-2xl w-[450px] p-8 relative"
          >
            <h2 className="text-center text-2xl font-bold text-green-600 mb-4">
              Tasty<span className="text-red-500">FOODS</span>
            </h2>
            <p className="text-center text-sm text-gray-600 mb-2">
              🍽️ Thank you for dining with us!
            </p>
            <hr className="border-dashed border-gray-400 mb-4" />

            <div className="text-sm space-y-1 mb-4">
              <p>
                <strong>Order ID:</strong> ORD-2045
              </p>
              <p>
                <strong>Customer:</strong> John Doe
              </p>
              <p>
                <strong>Table:</strong> 12
              </p>
              <p>
                <strong>Payment Mode:</strong>Cash
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleString()}
              </p>
            </div>

            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Item</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Mexican Tacos</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2 text-right">$12.77</td>
                </tr>
                <tr>
                  <td className="p-2">Submarine Sandwich</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2 text-right">$19.46</td>
                </tr>
                <tr>
                  <td className="p-2">Garlic Toast</td>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2 text-right">$8.69</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-sm space-y-1 text-right">
              <p>Subtotal: $40.92</p>
              <p>Service Charge (10%): $4.09</p>
              <p>GST (5%): $2.04</p>
              <hr className="border-dashed border-gray-400 my-2" />
              <p className="font-bold text-lg text-green-600">
                Grand Total: $47.05
              </p>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              “We hope to serve you again soon!”
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowReceipt(false);
                  onClose();
                }}
                className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-900"
              >
                Close
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-green-500 text-black px-5 py-2 rounded-full hover:bg-green-600"
              >
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-500"
              >
                Print
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
