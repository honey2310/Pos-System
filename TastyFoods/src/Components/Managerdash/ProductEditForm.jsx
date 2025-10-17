// // src/features/products/EditProduct.jsx
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { editProduct } from "../../Slices/Md/Products";
// import ManagerNavbar from "./ManagerNavbar";
// import { motion, AnimatePresence } from "framer-motion";

// export default function EditProduct() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const productToEdit = location.state?.product;

//   const [formData, setFormData] = useState({
//     name: productToEdit?.name || "",
//     category: productToEdit?.category || "",
//     description: productToEdit?.description || "",
//     price: productToEdit?.price || 0,
//     img: productToEdit?.img || "",
//     tag: productToEdit?.tag || "",
//   });

//   const [showPopup, setShowPopup] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(editProduct({ id: productToEdit.id, updatedProduct: formData }));
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     navigate("/products");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-10 pt-40">
//       <ManagerNavbar />
//       <h2 className="text-3xl font-bold text-red-400 mb-6">Edit Product</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
//       >
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Product Name"
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//           required
//         />
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           placeholder="Category"
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//           required
//         />
//         <input
//           type="text"
//           name="tag"
//           value={formData.tag}
//           onChange={handleChange}
//           placeholder="Tag (e.g. 10% OFF)"
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//         />
//         <input
//           type="text"
//           name="img"
//           value={formData.img}
//           onChange={handleChange}
//           placeholder="Image URL"
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700 col-span-2"
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700 col-span-2"
//           rows="4"
//         ></textarea>

//         <button
//           type="submit"
//           className="bg-red-600 hover:bg-red-700 col-span-2 py-3 rounded-lg font-semibold"
//         >
//           Update Product
//         </button>
//       </form>

//       {/* ✅ Confirmation Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 text-center max-w-md w-full"
//             >
//               <h2 className="text-2xl font-bold text-green-400 mb-3">
//                 Product Updated!
//               </h2>
//               <p className="text-gray-300 mb-6">
//                 The product has been successfully updated.
//               </p>
//               <button
//                 onClick={closePopup}
//                 className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold"
//               >
//                 OK
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProduct } from "../../Slices/Md/Products";
import ManagerNavbar from "./ManagerNavbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productToEdit = location.state?.product;

  const [formData, setFormData] = useState({
    name: productToEdit?.name || "",
    category: productToEdit?.category || "",
    description: productToEdit?.description || "",
    price: productToEdit?.price || 0,
    img: productToEdit?.img || "",
    tag: productToEdit?.tag || "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({ id: productToEdit.id, updatedProduct: formData }));
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
      <ManagerNavbar />

      <div className="p-6 pt-40 max-w-4xl mx-auto w-full">
        {/* === Back Button === */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-[#04040b] font-medium hover:scale-105 transition-transform mb-6"
        >
          <FaArrowLeft className="text-lg" />
          Back to Products
        </button>

        {/* === Title === */}
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

        {/* === Form === */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/40"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
            required
          />
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="Tag (e.g. 10% OFF)"
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
          />
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 col-span-2 transition"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 col-span-2 transition"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="col-span-2 py-3 rounded-lg font-semibold bg-[#ae8c70] hover:bg-[#9d7c63] text-white transition"
          >
            Update Product
          </button>
        </form>
      </div>

      {/* ✅ Confirmation Popup */}
      <AnimatePresence>
        {showPopup && (
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
              className="bg-white/90 rounded-2xl p-8 shadow-2xl border border-[#ae8c70]/40 text-center max-w-md w-full text-[#04040b]"
            >
              <h2 className="text-2xl font-bold text-[#ae8c70] mb-3">
                Product Updated!
              </h2>
              <p className="mb-6">The product has been successfully updated.</p>
              <button
                onClick={closePopup}
                className="bg-[#ae8c70] hover:bg-[#9d7c63] px-6 py-2 rounded-lg font-semibold text-white transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
