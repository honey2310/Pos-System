import React, { useState } from "react";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import OrderSuccessPopup from "./OrderSuccessPopup"; // ✅ Import popup

export default function ConfirmOrderPage() {
  const [showPopup, setShowPopup] = useState(false); // ✅ Popup state

  const orders = [
    {
      name: "Mexican Tacos",
      qty: 2,
      price: "$12.77",
      addons: "7 Delicious add-ons",
      img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Submarine Sandwich",
      qty: 2,
      price: "$19.46",
      addons: "3 Delicious add-ons",
      img: "https://images.unsplash.com/photo-1699728088600-6d684acbeada?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Garlic Toast",
      qty: 2,
      price: "$8.69",
      addons: "2 Delicious add-ons",
      img: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative">
      {/* ✅ Include popup */}
      <OrderSuccessPopup show={showPopup} onClose={() => setShowPopup(false)} />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-gray-900/70 backdrop-blur-md border-b border-gray-800 rounded-b-3xl">
        <h1 className="text-2xl font-extrabold tracking-wide text-red-500">
          Tasty<span className="text-green-400">FOODS</span>
        </h1>
        <div className="flex items-center gap-3 bg-gray-800/40 px-4 py-2 rounded-full border border-gray-700">
          <FaUserAlt className="text-green-400" />
          <span className="text-sm">Employee: Khushboo</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1 p-8 gap-10">
        {/* LEFT SIDE */}
        <div className="w-2/3 space-y-6">
          {/* Customer Info Form */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              Customer Details
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {/* ✅ Added new fields */}
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter contact number"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Table Number
                </label>
                <input
                  type="text"
                  placeholder="Enter table number"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Order ID
                </label>
                <input
                  type="text"
                  placeholder="Auto-generated ID"
                  value="ORD-2045"
                  disabled
                  className="w-full px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Confirmed Orders */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-red-400">
              Confirmed Order
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700">
                  <th className="pb-2">Dish</th>
                  <th className="pb-2">Add-ons</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                  >
                    <td className="flex items-center gap-3 py-3">
                      <img
                        src={order.img}
                        alt={order.name}
                        className="w-12 h-12 object-cover rounded-xl"
                      />
                      <span className="font-medium">{order.name}</span>
                    </td>
                    <td className="text-sm text-gray-400">{order.addons}</td>
                    <td className="text-center">{order.qty}</td>
                    <td className="text-right font-semibold text-green-400">
                      {order.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-6 border-t border-gray-800 pt-4 text-right space-y-1">
              <p className="text-gray-400 text-sm">
                Subtotal: <span className="text-white">$40.92</span>
              </p>
              <p className="text-gray-400 text-sm">
                Service Charge (10%): <span className="text-white">$4.09</span>
              </p>
              <p className="text-gray-400 text-sm">
                GST (5%): <span className="text-white">$2.04</span>
              </p>
              <p className="font-semibold text-yellow-400 text-lg">
                Grand Total: $47.05
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-yellow-400">
              Select Payment Mode
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-2xl hover:border-red-500 hover:bg-gray-800/60 transition cursor-pointer">
                <FaCreditCard className="text-red-500 text-xl" />
                <div>
                  <h4 className="font-semibold">Pay using Card</h4>
                  <p className="text-gray-400 text-sm">
                    Complete payment using debit or credit card.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-2xl hover:border-green-500 hover:bg-gray-800/60 transition cursor-pointer">
                <FaMoneyBillWave className="text-green-500 text-xl" />
                <div>
                  <h4 className="font-semibold">Pay using Cash</h4>
                  <p className="text-gray-400 text-sm">
                    Complete payment in cash at counter.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-2xl hover:border-yellow-400 hover:bg-gray-800/60 transition cursor-pointer">
                <MdQrCodeScanner className="text-yellow-400 text-xl" />
                <div>
                  <h4 className="font-semibold">Pay using UPI / QR</h4>
                  <p className="text-gray-400 text-sm">
                    Scan QR to complete payment digitally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Trigger popup */}
          <button
            onClick={() => setShowPopup(true)}
            className="mt-8 bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-full transition text-lg"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
