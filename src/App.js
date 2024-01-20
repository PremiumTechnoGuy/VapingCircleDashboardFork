import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainPage from "./Sub_Component/Dashboard/MainPage";
import AddCategory from "./Sub_Component/Dashboard/AddCategory";
import AddProduct from "./Sub_Component/Dashboard/AddProduct";
import Orders from "./Sub_Component/Dashboard/Orders";
import AllProducts from "./Sub_Component/Dashboard/AllProducts";
import AllCategory from "./Sub_Component/Dashboard/AllCategory";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<MainPage />} />
            <Route path="/dashboard/addCategory" element={<AddCategory />} />
            <Route path="/dashboard/all_category" element={<AllCategory />} />
            <Route path="/dashboard/addProduct" element={<AddProduct />} />
            <Route path="/dashboard/all_product" element={<AllProducts />} />
            <Route path="/dashboard/orders" element={<Orders />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
