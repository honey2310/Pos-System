// import React from "react";
// import {
//   FaShoppingCart,
//   FaSearch,
//   FaUserAlt,
//   FaUtensils,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { MdFastfood, MdHistory } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import EmployeeNavbar from "./Navbar";

// export default function EmployeePanel() {
//   const navigate = useNavigate();

//   const menu = [
//     {
//       name: "Bacon Burger",
//       desc: "Juicy beef patty, crispy bacon & smoky add-ons.",
//       price: "$3.49",
//       img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80",
//       tag: "15% Off",
//       color: "red",
//     },
//     {
//       name: "Crispy Fried Chicken",
//       desc: "Golden-brown crispy exterior, tender flavorful meat.",
//       price: "$4.69",
//       img: "https://images.unsplash.com/photo-1628430042373-7fdf9431ccf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q3Jpc3B5JTIwRnJpZWQlMjBDaGlja2VufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
//       tag: "25% Off",
//       color: "green",
//     },
//     {
//       name: "Mexican Tacos",
//       desc: "Fresh salsa, creamy guacamole & tangy sour cream.",
//       price: "$1.99",
//       img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80",
//       tag: "10% Off",
//       color: "orange",
//     },
//     {
//       name: "Submarine Sandwich",
//       desc: "Mouthwatering sandwich with 20+ add-ons.",
//       price: "$6.99",
//       img: "https://images.unsplash.com/photo-1699728088600-6d684acbeada?auto=format&fit=crop&w=900&q=60",
//       tag: "New Arrival",
//       color: "pink",
//     },
//     {
//       name: "Garlic Toast",
//       desc: "Toasted slices with creamy garlic butter.",
//       price: "$1.25",
//       img: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=900&q=60",
//       tag: "20% Off",
//       color: "yellow",
//     },
//     {
//       name: "Salami Pizza",
//       desc: "Thin crust with tomato sauce & melted cheese.",
//       price: "$5.77",
//       img: "https://media.istockphoto.com/id/183778230/photo/lifting-a-slice-of-warm-pepperoni-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=3XYuMusi_oBf4AVaCAX9N485O0mkIaLjXzW4jl-ituA=",
//       tag: "Out of Stock",
//       color: "gray",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
//       {<EmployeeNavbar />}
//       {/* 🔹 Main Content */}
//       <div className="flex flex-1 p-6 gap-6 overflow-hidden">
//         {/* Left Section: Menu Items */}
//         <div className="flex-1 overflow-y-auto pr-4">
//           {/* Search + Categories */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex gap-3 flex-wrap">
//               {["All", "Pizza", "Tacos", "Chicken", "Pasta", "Sandwiches"].map(
//                 (cat) => (
//                   <button
//                     key={cat}
//                     className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-full hover:bg-red-500 hover:border-red-500 hover:text-white text-sm transition"
//                   >
//                     {cat}
//                   </button>
//                 )
//               )}
//             </div>

//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search menu..."
//                 className="bg-gray-900/60 border border-gray-700 rounded-full px-10 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:border-red-500"
//               />
//               <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
//             </div>
//           </div>

//           {/* Menu Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {menu.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="bg-gray-900/60 rounded-3xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] transition relative"
//               >
//                 {/* Tag */}
//                 <span
//                   className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-black font-semibold ${
//                     item.color === "gray"
//                       ? "bg-gray-400"
//                       : `bg-${item.color}-400`
//                   }`}
//                 >
//                   {item.tag}
//                 </span>

//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   className="w-full h-44 object-cover"
//                 />

//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg">{item.name}</h3>
//                   <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="font-bold text-green-400">
//                       {item.price}
//                     </span>
//                     <button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 text-sm font-semibold">
//                       Add +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Section: Order Details */}
//         <aside className="w-80 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between">
//           <div>
//             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//               <FaShoppingCart className="text-green-400" /> Order Summary
//             </h2>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold">Bacon Burger</p>
//                   <p className="text-gray-400 text-sm">x2</p>
//                 </div>
//                 <span>$6.98</span>
//               </div>

//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold">Mexican Taco</p>
//                   <p className="text-gray-400 text-sm">x1</p>
//                 </div>
//                 <span>$1.99</span>
//               </div>
//             </div>
//           </div>

//           {/* Totals */}
//           <div className="mt-8 border-t border-gray-700 pt-4">
//             <div className="flex justify-between text-gray-400 text-sm mb-1">
//               <span>Subtotal</span>
//               <span>$8.97</span>
//             </div>
//             <div className="flex justify-between text-gray-400 text-sm mb-1">
//               <span>Taxes</span>
//               <span>$0.81</span>
//             </div>
//             <div className="flex justify-between text-lg font-semibold text-green-400 mb-4">
//               <span>Total</span>
//               <span>$9.78</span>
//             </div>
//             <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition" onClick={()=>{navigate("/employee-orderpage")}}>
//               Confirm Order
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMenu,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../Slices/Ed";
import EmployeeNavbar from "./Navbar";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmployeePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = useSelector((state) => state.Ed?.EdMenu || []);
  const cart = useSelector((state) => state.Ed?.EdCart || []);

  useEffect(() => {
    dispatch(FetchMenu());
  }, [dispatch]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = +(subtotal * 0.09).toFixed(2);
  const total = +(subtotal + taxes).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      <EmployeeNavbar />
      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
        {/* Left Section: Menu */}
        <div className="flex-1 overflow-y-auto pr-4">
          {/* Search & categories omitted for brevity */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900/60 rounded-3xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] transition relative"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-green-400">
                      ${item.price}
                    </span>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 text-sm font-semibold"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Cart */}
        <aside className="w-80 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-green-400" /> Order Summary
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <button
                        className="bg-gray-700 px-2 rounded"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-gray-700 px-2 rounded"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="text-red-500 font-bold mt-1"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-4">
            <div className="flex justify-between text-gray-400 text-sm mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm mb-1">
              <span>Taxes</span>
              <span>${taxes}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-green-400 mb-4">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition"
              onClick={() => navigate("/employee-orderpage")}
            >
              Confirm Order
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}


