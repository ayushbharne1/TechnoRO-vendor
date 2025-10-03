import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Leads";
import Engineers from "../pages/Engineers";
import Inventory from "../pages/Inventory";
import MainLayout from "../components/layouts/MainLayout";
import City from "../pages/City";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Services from "../pages/Services";
import Products from "../pages/Products";
import Customer from "../pages/Customer";
import AddProduct from "../pages/AddProduct";
import Leads from "../pages/Leads";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes with Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/city" element={<City />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/Leads" element={<Leads />} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
