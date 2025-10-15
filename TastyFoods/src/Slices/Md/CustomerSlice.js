// src/Slices/Md/CustomerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const res = await fetch("http://localhost:3000/customers");
  return res.json();
});

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await fetch(`http://localhost:3000/customers/${id}`, { method: "DELETE" });
    return id;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (updatedCustomer) => {
    const res = await fetch(
      `http://localhost:3000/customers/${updatedCustomer.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      }
    );
    return res.json();
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter((cust) => cust.id !== action.payload);
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default customerSlice.reducer;
