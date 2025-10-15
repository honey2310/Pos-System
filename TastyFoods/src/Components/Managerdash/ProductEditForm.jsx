// src/features/products/EditProduct.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProduct } from "../../Slices/Md/Products";
import ManagerNavbar from "./ManagerNavbar";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-gray-950 text-white p-10 pt-40">
      <ManagerNavbar />
      <h2 className="text-3xl font-bold text-red-400 mb-6">Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Tag (e.g. 10% OFF)"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 col-span-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 col-span-2"
          rows="4"
        ></textarea>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 col-span-2 py-3 rounded-lg font-semibold"
        >
          Update Product
        </button>
      </form>

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
              className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 text-center max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-green-400 mb-3">
                Product Updated!
              </h2>
              <p className="text-gray-300 mb-6">
                The product has been successfully updated.
              </p>
              <button
                onClick={closePopup}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold"
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
