// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// const initialState = {
//     EdMenu:[],
//     EdCart:[]
// }

// const FetchMenu=createAsyncThunk(()=>{
//     const menu=fetch("http://localhost:3000/menu").then((res)=>res.json());
//     return menu;
// });

// const EdSlice=createSlice({
//     name:"Ed",
//     initialState:initialState,
//     reducers:{
//         setEdData:(state,action)=>{
//             state.EdData=action.payload;
//         }
//     },
//     extraReducers:()=>{}

// })




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  EdMenu: [],
  EdCart: [],
};

export const FetchMenu = createAsyncThunk("ed/fetchMenu", async () => {
  const res = await fetch("http://localhost:3000/menu");
  const data = await res.json();
  return data;
});

const EdSlice = createSlice({
  name: "Ed",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.EdCart.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.EdCart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.EdCart = state.EdCart.filter((i) => i.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.EdCart.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.EdCart.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove item if quantity reaches 0
          state.EdCart = state.EdCart.filter((i) => i.id !== action.payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchMenu.fulfilled, (state, action) => {
      state.EdMenu = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = EdSlice.actions;

export default EdSlice.reducer;

