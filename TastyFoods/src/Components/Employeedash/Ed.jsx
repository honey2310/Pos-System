// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FetchMenu,
//   addToCart,
//   removeFromCart,
//   incrementQuantity,
//   decrementQuantity,
// } from "../../Slices/Ed/Ed";
// import EmployeeNavbar from "./Navbar";
// import {
//   FaShoppingCart,
//   FaSearch,
//   FaArrowUp,
//   FaArrowDown,
//   FaUndo,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function EmployeePanel() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const menu = useSelector((state) => state.Ed?.EdMenu || []);
//   const cart = useSelector((state) => state.Ed?.EdCart || []);

//   // 🔹 States for filters/sorting/search
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState(null); // "asc" | "desc" | null

//   // ✅ Fetch Menu on mount
//   useEffect(() => {
//     dispatch(FetchMenu());
//   }, [dispatch]);

//   // ✅ Save Redux cart to localStorage on every change (so ConfirmOrder page can read it)
//   useEffect(() => {
//     if (cart.length > 0) {
//       localStorage.setItem(
//         "cart",
//         JSON.stringify(
//           cart.map((item) => ({
//             name: item.name,
//             qty: item.quantity,
//             price: `$${item.price}`,
//             img: item.img,
//             addons: item.addons || "",
//           }))
//         )
//       );
//     } else {
//       localStorage.removeItem("cart");
//     }
//   }, [cart]);

//   // 🧩 Extract unique categories
//   const categories = useMemo(() => {
//     const unique = [...new Set(menu.map((item) => item.category))];
//     return ["All", ...unique];
//   }, [menu]);

//   // 🔍 Filter + Sort menu
//   const filteredMenu = useMemo(() => {
//     let result = menu.filter((item) => {
//       const matchCategory =
//         selectedCategory === "All" || item.category === selectedCategory;
//       const matchSearch = item.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       return matchCategory && matchSearch;
//     });

//     if (sortOrder === "desc") {
//       result = [...result].sort((a, b) => b.price - a.price);
//     } else if (sortOrder === "asc") {
//       result = [...result].sort((a, b) => a.price - b.price);
//     }

//     return result;
//   }, [menu, selectedCategory, searchTerm, sortOrder]);

//   // 💰 Calculate totals
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const taxes = +(subtotal * 0.09).toFixed(2);
//   const total = +(subtotal + taxes).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
//       <EmployeeNavbar />

//       <div className="flex flex-1 p-6 gap-6 overflow-hidden">
//         {/* 🔹 Left Section: Menu */}
//         <div className="flex-1 overflow-y-auto pr-4">
//           {/* 🔸 Categories, Search, and Sort Controls */}
//           <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
//             <div className="flex gap-3 flex-wrap">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-4 py-2 border rounded-full text-sm transition ${
//                     selectedCategory === cat
//                       ? "bg-red-500 border-red-500 text-[#C1BAA1]"
//                       : "bg-gray-800/60 border-gray-700 hover:bg-red-500/70 hover:border-red-500"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* 🔸 Search + Sorting */}
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search menu..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="bg-gray-900/60 border border-gray-700 rounded-full px-10 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:border-red-500"
//                 />
//                 <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setSortOrder("desc")}
//                   title="High to Low"
//                   className={`p-2 rounded-full border transition ${
//                     sortOrder === "desc"
//                       ? "bg-red-500 border-red-500 text-white"
//                       : "bg-gray-800/60 border-gray-700 hover:bg-red-500/70"
//                   }`}
//                 >
//                   <FaArrowUp />
//                 </button>

//                 <button
//                   onClick={() => setSortOrder("asc")}
//                   title="Low to High"
//                   className={`p-2 rounded-full border transition ${
//                     sortOrder === "asc"
//                       ? "bg-red-500 border-red-500 text-white"
//                       : "bg-gray-800/60 border-gray-700 hover:bg-red-500/70"
//                   }`}
//                 >
//                   <FaArrowDown />
//                 </button>

//                 <button
//                   onClick={() => setSortOrder(null)}
//                   title="Reset Sorting"
//                   className={`p-2 rounded-full border transition ${
//                     sortOrder === null
//                       ? "bg-green-500 border-green-500 text-white"
//                       : "bg-gray-800/60 border-gray-700 hover:bg-green-500/70"
//                   }`}
//                 >
//                   <FaUndo />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* 🔸 Menu Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredMenu.length > 0 ? (
//               filteredMenu.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-gray-900/60 rounded-3xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] transition relative"
//                 >
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="w-full h-44 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg">{item.name}</h3>
//                     <p className="text-gray-400 text-sm mt-1">
//                       {item.desc || item.description}
//                     </p>
//                     <div className="flex justify-between items-center mt-4">
//                       <span className="font-bold text-green-400">
//                         ${item.price}
//                       </span>
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-sm font-semibold"
//                         onClick={() => dispatch(addToCart(item))}
//                       >
//                         Add +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400 col-span-full text-center">
//                 No items found.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* 🔹 Right Section: Cart */}
//         <aside
//           className={`w-80 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 flex flex-col transition-all duration-300 ${
//             cart.length === 0 ? "h-fit" : "justify-between"
//           }`}
//         >
//           {cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center text-gray-400 h-40">
//               <FaShoppingCart className="text-3xl mb-2 text-gray-600" />
//               <p>No items in cart</p>
//             </div>
//           ) : (
//             <>
//               <div>
//                 <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                   <FaShoppingCart className="text-green-400" /> Order Summary
//                 </h2>

//                 <div className="space-y-4 max-h-96 overflow-y-auto">
//                   {cart.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex justify-between items-center border-b border-gray-700 pb-2"
//                     >
//                       <div>
//                         <p className="font-semibold">{item.name}</p>
//                         <div className="flex items-center gap-2 mt-1 text-sm">
//                           <button
//                             className="bg-gray-700 px-2 rounded"
//                             onClick={() => dispatch(decrementQuantity(item.id))}
//                           >
//                             -
//                           </button>
//                           <span>{item.quantity}</span>
//                           <button
//                             className="bg-gray-700 px-2 rounded"
//                             onClick={() => dispatch(incrementQuantity(item.id))}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <span>${(item.price * item.quantity).toFixed(2)}</span>
//                         <button
//                           className="text-red-500 font-bold mt-1"
//                           onClick={() => dispatch(removeFromCart(item.id))}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-8 border-t border-gray-700 pt-4">
//                 <div className="flex justify-between text-gray-400 text-sm mb-1">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-400 text-sm mb-1">
//                   <span>Taxes</span>
//                   <span>${taxes}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-semibold text-green-400 mb-4">
//                   <span>Total</span>
//                   <span>${total}</span>
//                 </div>
//                 <button
//                   className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition"
//                   onClick={() => navigate("/employee-orderpage")}
//                 >
//                   Confirm Order
//                 </button>
//               </div>
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMenu,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../Slices/Ed/Ed";
import EmployeeNavbar from "./Navbar";
import {
  FaShoppingCart,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaUndo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmployeePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = useSelector((state) => state.Ed?.EdMenu || []);
  const cart = useSelector((state) => state.Ed?.EdCart || []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    dispatch(FetchMenu());
  }, [dispatch]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.map((item) => ({
            name: item.name,
            qty: item.quantity,
            price: `$${item.price}`,
            img: item.img,
            addons: item.addons || "",
          }))
        )
      );
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const categories = useMemo(() => {
    const unique = [...new Set(menu.map((item) => item.category))];
    return ["All", ...unique];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    let result = menu.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortOrder === "desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortOrder === "asc") result = [...result].sort((a, b) => a.price - b.price);

    return result;
  }, [menu, selectedCategory, searchTerm, sortOrder]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = +(subtotal * 0.09).toFixed(2);
  const total = +(subtotal + taxes).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
      <EmployeeNavbar />

      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 overflow-y-auto pr-4">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 border rounded-full text-sm transition ${
                    selectedCategory === cat
                      ? "bg-[#ae8c72] border-[#ae8c72] text-white"
                      : "bg-[#dfc9b8]/70 border-[#dfc9b8] hover:bg-[#ae8c72]/70 hover:border-[#ae8c72]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#dfc9b8]/50 border border-[#ae8c72] rounded-full px-10 py-2 text-sm placeholder-[#04040b]/50 focus:outline-none focus:border-[#ae8c72]"
                />
                <FaSearch className="absolute left-3 top-2.5 text-[#04040b]/50" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortOrder("desc")}
                  title="High to Low"
                  className={`p-2 rounded-full border transition ${
                    sortOrder === "desc"
                      ? "bg-[#ae8c72] border-[#ae8c72] text-white"
                      : "bg-[#dfc9b8]/50 border-[#dfc9b8] hover:bg-[#ae8c72]/70"
                  }`}
                >
                  <FaArrowUp />
                </button>

                <button
                  onClick={() => setSortOrder("asc")}
                  title="Low to High"
                  className={`p-2 rounded-full border transition ${
                    sortOrder === "asc"
                      ? "bg-[#ae8c72] border-[#ae8c72] text-white"
                      : "bg-[#dfc9b8]/50 border-[#dfc9b8] hover:bg-[#ae8c72]/70"
                  }`}
                >
                  <FaArrowDown />
                </button>

                <button
                  onClick={() => setSortOrder(null)}
                  title="Reset Sorting"
                  className={`p-2 rounded-full border transition ${
                    sortOrder === null
                      ? "bg-[#04040b] border-[#04040b] text-white"
                      : "bg-[#dfc9b8]/50 border-[#dfc9b8] hover:bg-[#04040b]/70"
                  }`}
                >
                  <FaUndo />
                </button>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f7f0fd]/70 rounded-3xl overflow-hidden border border-[#ae8c72] shadow-lg hover:shadow-[#ae8c72]/40 hover:scale-[1.02] transition relative"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#04040b]">{item.name}</h3>
                    <p className="text-[#04040b]/70 text-sm mt-1">
                      {item.desc || item.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-[#ae8c72]">
                        ${item.price}
                      </span>
                      <button
                        className="bg-[#ae8c72] hover:bg-[#dfc9b8] text-white rounded-full px-3 py-1 text-sm font-semibold"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        Add +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#04040b]/50 col-span-full text-center">
                No items found.
              </p>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <aside
          className={`w-80 bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-6 flex flex-col transition-all duration-300 ${
            cart.length === 0 ? "h-fit" : "justify-between"
          }`}
        >
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-[#04040b]/50 h-40">
              <FaShoppingCart className="text-3xl mb-2" />
              <p>No items in cart</p>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#04040b]">
                  <FaShoppingCart className="text-[#ae8c72]" /> Order Summary
                </h2>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-[#ae8c72]/50 pb-2"
                    >
                      <div>
                        <p className="font-semibold text-[#04040b]">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <button
                            className="bg-[#dfc9b8] px-2 rounded text-[#04040b]"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="bg-[#dfc9b8] px-2 rounded text-[#04040b]"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-[#04040b]">
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

              <div className="mt-8 border-t border-[#ae8c72]/50 pt-4">
                <div className="flex justify-between text-sm mb-1 text-[#04040b]/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1 text-[#04040b]/70">
                  <span>Taxes</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-[#ae8c72] mb-4">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button
                  className="w-full bg-[#ae8c72] hover:bg-[#dfc9b8] text-white py-3 rounded-full font-semibold transition"
                  onClick={() => navigate("/employee-orderpage")}
                >
                  Confirm Order
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
