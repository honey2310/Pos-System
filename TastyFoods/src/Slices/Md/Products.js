// src/features/products/ProductsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/menu"; // your JSON server URL

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

// ✅ Add product
export const addProduct = createAsyncThunk(
  "products/add",
  async (newProduct) => {
    const response = await axios.post(BASE_URL, newProduct);
    return response.data;
  }
);

// ✅ Edit product
export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, updatedProduct }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedProduct);
    return response.data;
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id; // must return id to update Redux state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
