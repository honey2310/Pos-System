// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Intro from "./Components/Intro/Intro";
// import LoginSelector from "./Components/LoginSelector/LoginSelector";
// // import LoginPage from "./Components/LoginPage/LoginPage";
// import MD from "./Components/Managerdash/MD";
// import Ed from "./Components/Employeedash/Ed";
// import OrderPage from "./Components/Employeedash/OrderPage";
// import History from "./Components/Employeedash/History";
// import Reports from "./Components/Employeedash/Reports";
// import ConfirmOrderPage from "./Components/Employeedash/ConfirmOrder";
// import PendingOrders from "./Components/Managerdash/PendingOrders";
// import ProductsPage from "./Components/Managerdash/Products";
// import ProductForm from "./Components/Managerdash/ProductAddForm";
// import CustomerPage from "./Components/Managerdash/CustomerPage";
// import EmployeeDetails from "./Components/Managerdash/EmployeeDetails";
// import EditProduct from "./Components/Managerdash/ProductEditForm";
// import EmployeeProfile from "./Components/Employeedash/Profile";
// import EmployeeLogin from "./Components/LoginPage/EmployeeLoginPage";
// import ManagerLogin from "./Components/LoginPage/ManagerLoginPage";

// export default function App() {
//   return (
//     <Routes>
//       {/* Step 1: Show Intro screen first */}
//       <Route path="/" element={<Intro />} />

//       {/* Step 2: After Intro disappears, it shows LoginSelector */}
//       <Route path="/login" element={<LoginSelector />} />

//       {/* Step 3: Manager and Employee login routes */}
//       <Route path="/manager-login" element={<ManagerLogin/>} />
//       <Route path="/employee-login" element={<EmployeeLogin/>} />
//       <Route path="/employee-dashboard" element={<Ed />} />
//       <Route path="/employee-orderpage" element={<ConfirmOrderPage />} />
//       <Route path="/employee-order" element={<OrderPage />} />
//       <Route path="/employee-history" element={<History />} />
//       <Route path="/employee-reports" element={<Reports />} />
//       <Route path="/employee-profile" element={<EmployeeProfile/>} />

//       <Route path="/manager-dashboard" element={<MD />} />
//       <Route path="/manager-pendingorders" element={<PendingOrders />} />
//       <Route path="/products" element={<ProductsPage />} />
//       <Route path="/add-product" element={<ProductForm />} />
//       <Route path="/edit-product/:id" element={<EditProduct />} />
//       <Route path="/manager-customers" element={<CustomerPage/>} />
//       <Route path="/manager-employeesdetails" element={<EmployeeDetails/>} />
//     </Routes>
//   );
// }


import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/Components/context/AuthContext";
import PrivateRoute from "../src/Components/PrivateRoute";

// Public Components
import Intro from "./Components/Intro/Intro";
import LoginSelector from "./Components/LoginSelector/LoginSelector";
import ManagerLogin from "./Components/LoginPage/ManagerLoginPage";
import EmployeeLogin from "./Components/LoginPage/EmployeeLoginPage";

// Employee Components
import Ed from "./Components/Employeedash/Ed";
import ConfirmOrderPage from "./Components/Employeedash/ConfirmOrder";
import OrderPage from "./Components/Employeedash/OrderPage";
import History from "./Components/Employeedash/History";
import Reports from "./Components/Employeedash/Reports";
import EmployeeProfile from "./Components/Employeedash/Profile";

// Manager Components
import MD from "./Components/Managerdash/MD";
import PendingOrders from "./Components/Managerdash/PendingOrders";
import ProductsPage from "./Components/Managerdash/Products";
import ProductForm from "./Components/Managerdash/ProductAddForm";
import EditProduct from "./Components/Managerdash/ProductEditForm";
import CustomerPage from "./Components/Managerdash/CustomerPage";
import EmployeeDetails from "./Components/Managerdash/EmployeeDetails";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<LoginSelector />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* Employee Private Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute roles={["employee"]}>
              <Ed />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-orderpage"
          element={
            <PrivateRoute roles={["employee"]}>
              <ConfirmOrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-order"
          element={
            <PrivateRoute roles={["employee"]}>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-history"
          element={
            <PrivateRoute roles={["employee"]}>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-reports"
          element={
            <PrivateRoute roles={["employee"]}>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-profile"
          element={
            <PrivateRoute roles={["employee"]}>
              <EmployeeProfile />
            </PrivateRoute>
          }
        />

        {/* Manager Private Routes */}
        <Route
          path="/manager-dashboard"
          element={
            <PrivateRoute roles={["manager"]}>
              <MD />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager-pendingorders"
          element={
            <PrivateRoute roles={["manager"]}>
              <PendingOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute roles={["manager"]}>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute roles={["manager"]}>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute roles={["manager"]}>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager-customers"
          element={
            <PrivateRoute roles={["manager"]}>
              <CustomerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager-employeesdetails"
          element={
            <PrivateRoute roles={["manager"]}>
              <EmployeeDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
