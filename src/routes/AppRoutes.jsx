import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../components/dashboard/Dashboard";

import Engineers from "../pages/Engineers";
import Inventory from "../pages/Inventory";
import MainLayout from "../components/layouts/MainLayout";
import City from "../pages/City";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Services from "../pages/Services";
import Products from "../pages/ProductPage/Products";
import Customer from "../pages/Customer";
import AddProduct from "../pages/ProductPage/AddProduct";
import Leads from "../pages/LeadManagement/Leads";
import ProductDetail from "../pages/ProductPage/ProductDetail";
import UpdateProduct from "../pages/ProductPage/UpdateProduct";
import AddLead from "../pages/LeadManagement/AddLead";
import ViewLead from "../pages/LeadManagement/ViewLead";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes with Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />
          <Route path="products/addproduct" element={<AddProduct />} />
          <Route path="/products/productdetail" element={<ProductDetail />} />
          <Route path="/products/updateproduct" element={<UpdateProduct />} />

          <Route path="/Leads" element={<Leads />} />
          <Route path="/Leads/addlead" element={<AddLead />} />
          <Route path="/Leads/viewlead" element={<ViewLead />} />
          
          <Route path="/city" element={<City />} />
          
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/inventory" element={<Inventory />} />
          
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/services" element={<Services />} />

          
          <Route path="/customers" element={<Customer />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
