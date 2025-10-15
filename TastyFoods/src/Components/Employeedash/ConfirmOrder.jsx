import React, { useState, useEffect } from "react";
import {
  FaUserAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import OrderSuccessPopup from "./OrderSuccessPopup";

export default function ConfirmOrderPage() {
  const { currentUser } = useSelector((state) => state.login);
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    table: "",
    address: "",
  });
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [cartItems, setCartItems] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleConfirm = () => {
    if (!customer.name || !customer.phone || !customer.table || !customer.address) {
      alert("Please fill all customer details!");
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
      0
    );
    const serviceCharge = subtotal * 0.1;
    const gst = subtotal * 0.05;
    const total = subtotal + serviceCharge + gst;

    const orderDetails = {
      orderId,
      customer,
      orders: cartItems,
      paymentMode,
      total,
      status: "Pending",
      employee: currentUser?.name || "Employee",
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderDetails]));
    localStorage.setItem("lastConfirmedOrder", JSON.stringify(orderDetails));

    setCartItems([]);
    localStorage.removeItem("cart");
    setLastOrder(orderDetails);
    setShowPopup(true);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price.replace("$", "")),
    0
  );
  const serviceCharge = subtotal * 0.1;
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + serviceCharge + gst;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative">
      <OrderSuccessPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        orderDetails={lastOrder}
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-gray-900/70 backdrop-blur-md border-b border-gray-800 rounded-b-3xl">
        <h1 className="text-2xl font-extrabold tracking-wide text-red-500">
          Tasty<span className="text-green-400">FOODS</span>
        </h1>
        <div className="flex items-center gap-3 bg-gray-800/40 px-4 py-2 rounded-full border border-gray-700">
          <FaUserAlt className="text-green-400" />
          <span className="text-sm">
            Employee: {currentUser?.name || "Employee"}
          </span>
        </div>
      </nav>

      <div className="flex flex-1 p-8 gap-10">
        {/* LEFT SIDE */}
        <div className="w-2/3 space-y-6">
          {/* Customer Info */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              Customer Details
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {["name", "phone", "table", "address"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-gray-400 text-sm mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={customer[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Order ID
                </label>
                <input
                  type="text"
                  value="Auto"
                  disabled
                  className="w-full px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Confirmed Orders */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-red-400">
              Order Details
            </h2>

            {cartItems.length > 0 && (
              <div className="grid grid-cols-3 text-sm font-semibold text-gray-300 border-b border-gray-800 pb-2 mb-3 px-2">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Price</span>
              </div>
            )}

            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Cart is empty</p>
              ) : (
                cartItems.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between bg-gray-800/40 border border-gray-700 rounded-2xl px-4 py-3 shadow-md"
                  >
                    <div className="flex items-center gap-3 w-1/2">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <p className="font-medium text-white">{item.name}</p>
                    </div>
                    <div className="text-center w-1/6">
                      <span className="text-gray-300">x{item.qty}</span>
                    </div>
                    <div className="flex items-center justify-end gap-3 w-1/3">
                      <span className="font-semibold text-green-400">
                        ₹
                        {(
                          item.qty * parseFloat(item.price.replace("$", ""))
                        ).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(i)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4 text-right space-y-1">
              <p className="text-gray-400 text-sm">
                Subtotal: <span className="text-white">₹{subtotal.toFixed(2)}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Service Charge (10%):{" "}
                <span className="text-white">₹{serviceCharge.toFixed(2)}</span>
              </p>
              <p className="text-gray-400 text-sm">
                GST (5%): <span className="text-white">₹{gst.toFixed(2)}</span>
              </p>
              <p className="font-semibold text-yellow-400 text-lg">
                Grand Total: ₹{grandTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Payment */}
        <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-yellow-400">
              Select Payment Mode
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Pay using Card",
                  desc: "Complete the payment using credit or debit card",
                  icon: <FaCreditCard />,
                  color: "red",
                },
                {
                  label: "Pay on Cash",
                  desc: "Complete your order payment using cash easily",
                  icon: <FaMoneyBillWave />,
                  color: "green",
                },
                {
                  label: "Pay using UPI or Scan",
                  desc: "Ask customer to pay using UPI or scanning QR code",
                  icon: <MdQrCodeScanner />,
                  color: "yellow",
                },
              ].map((method, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setPaymentMode(method.label)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMode === method.label
                      ? `border-${method.color}-500 bg-${method.color}-500/10`
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-${method.color}-400 text-2xl`}>
                      {method.icon}
                    </span>
                    <div>
                      <p className="font-medium">{method.label}</p>
                      <p className="text-sm text-gray-400">{method.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-8 w-full bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-2xl transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
