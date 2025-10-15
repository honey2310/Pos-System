// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Slices/Md/Products";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaArrowUp, FaArrowDown, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ManagerNavbar from "../Managerdash/ManagerNavbar";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status } = useSelector((state) => state.products);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null); // 'asc', 'desc', or null

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "asc") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
  }, [products, searchTerm, sortOrder]);

  const handleDelete = (id) => {
    setSelectedProduct(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct));
      setShowConfirm(false);
      setSelectedProduct(null);
    }
  };

  const handleEdit = (product) =>
    navigate(`/edit-product/${product.id}`, { state: { product } });

  const handleAdd = () => navigate("/add-product");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      <ManagerNavbar />

      <div className="p-6 pt-40">
        {/* Title + Search/Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-red-400 flex items-center gap-2">
            🍔 Product Management
          </h1>

          {/* Search + Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900/60 border border-gray-700 rounded-full px-10 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:border-red-500"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>

            {/* Sort Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder("desc")}
                title="High to Low"
                className={`p-2 rounded-full border transition ${
                  sortOrder === "desc"
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-gray-800/60 border-gray-700 hover:bg-red-500/70"
                }`}
              >
                <FaArrowUp />
              </button>
              <button
                onClick={() => setSortOrder("asc")}
                title="Low to High"
                className={`p-2 rounded-full border transition ${
                  sortOrder === "asc"
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-gray-800/60 border-gray-700 hover:bg-red-500/70"
                }`}
              >
                <FaArrowDown />
              </button>
              <button
                onClick={() => setSortOrder(null)}
                title="Reset Sorting"
                className={`p-2 rounded-full border transition ${
                  sortOrder === null
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-gray-800/60 border-gray-700 hover:bg-green-500/70"
                }`}
              >
                <FaUndo />
              </button>
            </div>
          </div>
        </div>

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error loading products</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Add Product */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleAdd}
            className="cursor-pointer flex flex-col items-center justify-center bg-gradient-to-br bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-lg h-95"
          >
            <FaPlus className="text-5xl mb-3" />
            <p className="font-semibold text-white text-lg">Add Product</p>
          </motion.div>

          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg h-96 flex flex-col justify-between"
            >
              <img
                src={product.img}
                alt={product.name}
                className="rounded-xl w-full h-44 object-cover mb-4"
              />
              <div>
                <h3 className="font-semibold text-xl">{product.name}</h3>
                <p className="text-gray-400 text-sm">{product.category}</p>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <p className="text-yellow-400 font-bold mt-1">
                  ₹{product.price}
                </p>
                <span className="text-green-400 text-xs">{product.tag}</span>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-400 hover:text-blue-500 text-xl"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-400 hover:text-red-500 text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {showConfirm && (
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
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                Delete Product
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
