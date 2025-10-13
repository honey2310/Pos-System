import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slices/LoginSlice";
import EdReducer from "../Slices/Ed";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    Ed: EdReducer,
  },
});

export default store;
