import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slices/LoginSlice";
import EdReducer from "../Slices/Ed/Ed";
import ProductsReducer from "../Slices/Md/Products";
import CustomerReducer from "../Slices/Md/CustomerSlice";
// import MdReducer  from "../Slices/Md/Md.slice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    Ed: EdReducer,
    products: ProductsReducer,
    customers: CustomerReducer,
    // md: MdReducer,
  },
});

export default store;
