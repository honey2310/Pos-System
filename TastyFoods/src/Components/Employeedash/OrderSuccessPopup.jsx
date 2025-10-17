// import React, { useState, useRef, useEffect } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// export default function OrderSuccessPopup({ show, onClose, orderDetails }) {
//   const [showReceipt, setShowReceipt] = useState(false);
//   const receiptRef = useRef(null);
//   const [order, setOrder] = useState(orderDetails || null);

//   useEffect(() => {
//     if (!orderDetails) {
//       const savedOrder = JSON.parse(localStorage.getItem("lastConfirmedOrder"));
//       if (savedOrder) setOrder(savedOrder);
//     } else {
//       setOrder(orderDetails);
//     }
//   }, [show, orderDetails]);

//   if (!order) return null;

//   const subtotal = order.orders.reduce(
//     (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
//     0
//   );
//   const serviceCharge = subtotal * 0.1;
//   const gst = subtotal * 0.05;
//   const grandTotal = subtotal + serviceCharge + gst;

//   const handleDownloadPDF = async () => {
//     if (!receiptRef.current) return;
//     const canvas = await html2canvas(receiptRef.current, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//       logging: false,
//       windowWidth: document.documentElement.scrollWidth,
//       windowHeight: document.documentElement.scrollHeight,
//     });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`Order_${order.orderId}.pdf`);
//   };

//   const handlePrint = () => {
//     if (!receiptRef.current) return;
//     const printWindow = window.open("", "_blank", "width=800,height=600");
//     if (!printWindow) return;
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Receipt</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             h2 { color: #16a34a; }
//             table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//             td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             th { background: #f4f4f4; }
//             .total { font-weight: bold; }
//           </style>
//         </head>
//         <body>${receiptRef.current.innerHTML}</body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   return (
//     <AnimatePresence>
//       {/* Confirmation popup */}
//       {show && !showReceipt && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="bg-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-2xl max-w-sm w-full"
//           >
//             <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4 animate-bounce" />
//             <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
//             <p className="text-gray-400 mb-6">
//               Your order has been successfully placed and sent to the kitchen 🍽️
//             </p>
//             <button
//               onClick={() => setShowReceipt(true)}
//               className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-full transition"
//             >
//               OK
//             </button>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Receipt popup */}
//       {show && showReceipt && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-y-auto"
//         >
//           <motion.div
//             ref={receiptRef}
//             initial={{ y: 80, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 80, opacity: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="bg-white text-black rounded-3xl shadow-2xl w-[450px] p-8 relative"
//           >
//             <h2 className="text-center text-2xl font-bold text-green-600 mb-4">
//               Tasty<span className="text-red-500">FOODS</span>
//             </h2>
//             <p className="text-center text-sm text-gray-600 mb-2">
//               🍽️ Thank you for dining with us!
//             </p>
//             <hr className="border-dashed border-gray-400 mb-4" />

//             <div className="text-sm space-y-1 mb-4">
//               <p><strong>Order ID:</strong> {order.orderId}</p>
//               <p><strong>Customer:</strong> {order.customer.name}</p>
//               <p><strong>Table:</strong> {order.customer.table}</p>
//               <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
//               <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
//               <p><strong>Employee:</strong> {order.employee}</p>
//             </div>

//             <table className="w-full text-sm border border-gray-300 mb-4">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2">Item</th>
//                   <th className="p-2 text-center">Qty</th>
//                   <th className="p-2 text-right">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.orders.map((item, i) => (
//                   <tr key={i}>
//                     <td className="p-2">{item.name}</td>
//                     <td className="p-2 text-center">{item.qty}</td>
//                     <td className="p-2 text-right">
//                       ${(item.qty * parseFloat(item.price.replace("$", ""))).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="mt-4 text-sm space-y-1 text-right">
//               <p>Subtotal: ${subtotal.toFixed(2)}</p>
//               <p>Service Charge (10%): ${serviceCharge.toFixed(2)}</p>
//               <p>GST (5%): ${gst.toFixed(2)}</p>
//               <hr className="border-dashed border-gray-400 my-2" />
//               <p className="font-bold text-lg text-green-600">Grand Total: ${grandTotal.toFixed(2)}</p>
//             </div>

//             <p className="text-center text-xs text-gray-500 mt-4">
//               “We hope to serve you again soon!”
//             </p>

//             <div className="flex justify-center gap-3 mt-6">
//               <button
//                 onClick={() => { setShowReceipt(false); onClose(); }}
//                 className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-900"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleDownloadPDF}
//                 className="bg-green-500 text-black px-5 py-2 rounded-full hover:bg-green-600"
//               >
//                 Download PDF
//               </button>
//               <button
//                 onClick={handlePrint}
//                 className="bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-500"
//               >
//                 Print
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderSuccessPopup({ show, onClose, orderDetails }) {
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef(null);
  const [order, setOrder] = useState(orderDetails || null);

  useEffect(() => {
    if (!orderDetails) {
      const savedOrder = JSON.parse(localStorage.getItem("lastConfirmedOrder"));
      if (savedOrder) setOrder(savedOrder);
    } else {
      setOrder(orderDetails);
    }
  }, [show, orderDetails]);

  if (!order) return null;

  const subtotal = order.orders.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
    0
  );
  const serviceCharge = subtotal * 0.1;
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + serviceCharge + gst;

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Order_${order.orderId}.pdf`);
  };

  const handlePrint = () => {
    if (!receiptRef.current) return;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f7f0fd; color: #04040b; }
            h2 { color: #ae8c72; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            td, th { border: 1px solid #dfc9b8; padding: 8px; text-align: left; }
            th { background: #dfc9b8; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>${receiptRef.current.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <AnimatePresence>
      {/* Confirmation popup */}
      {show && !showReceipt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/90 rounded-3xl p-10 text-center shadow-2xl border border-[#ae8c72] max-w-sm w-full"
          >
            <FaCheckCircle className="text-[#ae8c72] text-6xl mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-[#04040b]/70 mb-6">
              Your order has been successfully placed and sent to the kitchen 🍽️
            </p>
            <button
              onClick={() => setShowReceipt(true)}
              className="bg-[#ae8c72] hover:bg-[#dfc9b8] text-white font-semibold px-6 py-2 rounded-full transition"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Receipt popup */}
      {show && showReceipt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4"
        >
          <motion.div
            ref={receiptRef}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white text-[#04040b] rounded-3xl shadow-2xl w-full max-w-md p-8 border border-[#ae8c72]"
          >
            <h2 className="text-center text-2xl font-bold text-[#ae8c72] mb-4">
              Tasty<span className="text-[#ae8c72]">FOODS</span>
            </h2>
            <p className="text-center text-sm text-[#04040b]/70 mb-2">
              🍽️ Thank you for dining with us!
            </p>
            <hr className="border-dashed border-[#dfc9b8] mb-4" />

            <div className="text-sm space-y-1 mb-4">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Customer:</strong> {order.customer.name}</p>
              <p><strong>Table:</strong> {order.customer.table}</p>
              <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Employee:</strong> {order.employee}</p>
            </div>

            <table className="w-full text-sm border border-[#dfc9b8] mb-4">
              <thead>
                <tr className="bg-[#dfc9b8]/40">
                  <th className="p-2">Item</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orders.map((item, i) => (
                  <tr key={i}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">{item.qty}</td>
                    <td className="p-2 text-right">
                      ${(item.qty * parseFloat(item.price.replace("$", ""))).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-sm space-y-1 text-right">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Service Charge (10%): ${serviceCharge.toFixed(2)}</p>
              <p>GST (5%): ${gst.toFixed(2)}</p>
              <hr className="border-dashed border-[#dfc9b8] my-2" />
              <p className="font-bold text-lg text-[#ae8c72]">Grand Total: ${grandTotal.toFixed(2)}</p>
            </div>

            <p className="text-center text-xs text-[#04040b]/50 mt-4">
              “We hope to serve you again soon!”
            </p>

            <div className="flex justify-center gap-3 mt-6 flex-wrap">
              <button
                onClick={() => { setShowReceipt(false); onClose(); }}
                className="bg-[#04040b] text-white px-5 py-2 rounded-full hover:bg-[#222] transition"
              >
                Close
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-[#ae8c72] text-white px-5 py-2 rounded-full hover:bg-[#dfc9b8] transition"
              >
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="bg-[#dfc9b8] text-[#04040b] px-5 py-2 rounded-full hover:bg-[#ae8c72] transition"
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

