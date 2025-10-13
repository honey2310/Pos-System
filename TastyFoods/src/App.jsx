import React from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./Components/Intro/Intro";
import LoginSelector from "./Components/LoginSelector/LoginSelector";
import LoginPage from "./Components/LoginPage/LoginPage";
import MD from "./Components/Managerdash/MD";
import Ed from "./Components/Employeedash/Ed";
import OrderPage from "./Components/Employeedash/OrderPage";
import History from "./Components/Employeedash/History";
import Reports from "./Components/Employeedash/Reports";
import ConfirmOrderPage from "./Components/Employeedash/ConfirmOrder";

export default function App() {
  return (
    <Routes>
      {/* Step 1: Show Intro screen first */}
      <Route path="/" element={<Intro />} />

      {/* Step 2: After Intro disappears, it shows LoginSelector */}
      <Route path="/login" element={<LoginSelector />} />

      {/* Step 3: Manager and Employee login routes */}
      <Route path="/manager-login" element={<LoginPage role="Manager" />} />
      <Route path="/employee-login" element={<LoginPage role="Employee" />} />
      <Route path="/manager-dashboard" element={<MD />} />
      <Route path="/employee-dashboard" element={<Ed />} />
      <Route path="/employee-orderpage" element={<ConfirmOrderPage/>} />

      <Route path="/employee-order" element={<OrderPage />} />
      <Route path="/employee-history" element={<History />} />
      <Route path="/employee-reports" element={<Reports />} />
    </Routes>
  );
}
