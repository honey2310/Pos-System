// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Slices/Md/Products";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaUndo,
} from "react-icons/fa";
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
    let temp = [...products];

    if (searchTerm) {
      temp = temp.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") temp.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") temp.sort((a, b) => b.price - a.price);

    setFilteredProducts(temp);
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
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c70] text-[#04040b] flex flex-col">
      <ManagerNavbar />

      <div className="p-6 pt-40">
        {/* Title + Search/Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-[#04040b] flex items-center gap-2">
            🍔 Product Management
          </h1>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/70 border border-[#ae8c70] rounded-full px-10 py-2 text-sm text-[#04040b] placeholder-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#ae8c70]"
              />
              <FaSearch className="absolute left-3 top-2.5 text-[#ae8c70]" />
            </div>

            {/* Sort Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder("desc")}
                title="High to Low"
                className={`p-2 rounded-full border transition ${
                  sortOrder === "desc"
                    ? "bg-[#ae8c70]/40 border-[#ae8c70]"
                    : "bg-white/60 border-[#dfc9b8] hover:bg-[#dfc9b8]/60"
                }`}
              >
                <FaArrowUp className="text-[#04040b]" />
              </button>
              <button
                onClick={() => setSortOrder("asc")}
                title="Low to High"
                className={`p-2 rounded-full border transition ${
                  sortOrder === "asc"
                    ? "bg-[#ae8c70]/40 border-[#ae8c70]"
                    : "bg-white/60 border-[#dfc9b8] hover:bg-[#dfc9b8]/60"
                }`}
              >
                <FaArrowDown className="text-[#04040b]" />
              </button>
              <button
                onClick={() => setSortOrder(null)}
                title="Reset Sorting"
                className={`p-2 rounded-full border transition ${
                  sortOrder === null
                    ? "bg-[#dfc9b8]/60 border-[#ae8c70]"
                    : "bg-white/60 border-[#dfc9b8] hover:bg-[#dfc9b8]/70"
                }`}
              >
                <FaUndo className="text-[#04040b]" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading/Error */}
        {status === "loading" && <p>Loading products...</p>}
        {status === "failed" && <p>Failed to load products.</p>}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Add Product */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleAdd}
            className="cursor-pointer flex flex-col items-center justify-center bg-white/70 rounded-2xl p-8 border border-[#ae8c70]/50 shadow-md"
          >
            <FaPlus className="text-5xl text-[#ae8c70] mb-3" />
            <p className="font-semibold text-lg">Add Product</p>
          </motion.div>

          {/* Product Cards */}
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white/80 border border-[#dfc9b8] rounded-2xl p-5 shadow-md flex flex-col justify-between"
            >
              <img
                src={product.img}
                alt={product.name}
                className="rounded-xl w-full h-44 object-cover mb-4 border border-[#dfc9b8]/60"
              />
              <div>
                <h3 className="font-semibold text-xl">{product.name}</h3>
                <p className="text-sm text-[#6b6b6b]">{product.category}</p>
                <p className="text-sm text-[#6b6b6b]">{product.description}</p>
                <p className="text-[#ae8c70] font-bold mt-1">
                  ₹{product.price}
                </p>
                <span className="text-xs text-[#04040b]/70">{product.tag}</span>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-[#ae8c70] hover:text-[#8e735c] text-lg transition"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-[#8e735c] hover:text-[#6b5748] text-lg transition"
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
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-[#dfc9b8] text-center max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-[#ae8c70] mb-3">
                Delete Product
              </h2>
              <p className="text-[#04040b]/80 mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-[#ae8c70]/80 hover:bg-[#ae8c70] px-5 py-2 rounded-lg text-white font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-[#dfc9b8]/80 hover:bg-[#dfc9b8] px-5 py-2 rounded-lg text-[#04040b] font-semibold"
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
