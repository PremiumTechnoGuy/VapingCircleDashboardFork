import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainPage from "./Sub_Component/Dashboard/MainPage";
import AddCategory from "./Sub_Component/Dashboard/AddCategory";
import AddProduct from "./Sub_Component/Dashboard/AddProduct";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {/* <Route path="/" element={<MainPage />} /> */}
            <Route path="/dashboard" element={<MainPage />} />
            <Route path="/dashboard/addCategory" element={<AddCategory />} />
            <Route path="/dashboard/addProduct" element={<AddProduct />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
