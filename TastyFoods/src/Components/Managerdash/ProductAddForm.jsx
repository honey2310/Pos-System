// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addProduct, editProduct, fetchProducts } from "../../Slices/Md/Products";
// import { useNavigate, useParams } from "react-router-dom";
// import ManagerNavbar from "./ManagerNavbar";

// export default function ProductForm() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const products = useSelector((state) => state.products.items);

//   const existingProduct = products.find((p) => p.id === Number(id));

//   const [form, setForm] = useState(
//     existingProduct || {
//       name: "",
//       category: "",
//       price: "",
//       taxRate: "",
//       tag: "",
//       description: "",
//       img: "",
//     }
//   );

//   useEffect(() => {
//     if (!products.length) dispatch(fetchProducts());
//   }, [dispatch, products]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (id) {
//       dispatch(editProduct({ id: Number(id), updatedProduct: form }));
//     } else {
//       dispatch(addProduct({ ...form, id: Date.now() }));
//     }
//     navigate("/products");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-10 pt-40">
//         <ManagerNavbar/>
//       <h2 className="text-3xl font-bold text-red-400 mb-6">
//         {id ? "Edit Product" : "Add Product"}
//       </h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//         <input
//           placeholder="Product Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//           required
//         />
//         <input
//           placeholder="Category"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//           required
//         />
//         <input
//           placeholder="Price"
//           type="number"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//           required
//         />
//         <input
//           placeholder="Tax Rate"
//           type="number"
//           value={form.taxRate}
//           onChange={(e) => setForm({ ...form, taxRate: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//         />
//         <input
//           placeholder="Tag (e.g. 10% OFF)"
//           value={form.tag}
//           onChange={(e) => setForm({ ...form, tag: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700"
//         />
//         <input
//           placeholder="Image URL"
//           value={form.img}
//           onChange={(e) => setForm({ ...form, img: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700 col-span-2"
//         />
//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="p-3 rounded-lg bg-gray-800 border border-gray-700 col-span-2"
//           rows="4"
//         ></textarea>

//         <button
//           type="submit"
//           className="bg-red-600 hover:bg-red-700 col-span-2 py-3 rounded-lg font-semibold"
//         >
//           {id ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct, fetchProducts } from "../../Slices/Md/Products";
import { useNavigate, useParams } from "react-router-dom";
import ManagerNavbar from "./ManagerNavbar";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);

  const existingProduct = products.find((p) => p.id === Number(id));

  const [form, setForm] = useState(
    existingProduct || {
      name: "",
      category: "",
      price: "",
      taxRate: "",
      tag: "",
      description: "",
      img: "",
    }
  );

  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
  }, [dispatch, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editProduct({ id: Number(id), updatedProduct: form }));
    } else {
      dispatch(addProduct({ ...form, id: Date.now() }));
    }
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
        <h2 className="text-3xl font-bold mb-6">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        {/* === Form === */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/40"
        >
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
            required
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
            required
          />
          <input
            placeholder="Tax Rate"
            type="number"
            value={form.taxRate}
            onChange={(e) => setForm({ ...form, taxRate: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
          />
          <input
            placeholder="Tag (e.g. 10% OFF)"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 transition"
          />
          <input
            placeholder="Image URL"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 col-span-2 transition"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 rounded-lg bg-white/70 border border-[#ae8c70]/50 focus:border-[#ae8c70] focus:ring-2 focus:ring-[#ae8c70]/40 col-span-2 transition"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="col-span-2 py-3 rounded-lg font-semibold bg-[#ae8c70] hover:bg-[#9d7c63] text-white transition"
          >
            {id ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

