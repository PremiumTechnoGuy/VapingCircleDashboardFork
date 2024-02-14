import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainPage from "./Sub_Component/Dashboard/MainPage";
import AddCategory from "./Sub_Component/Dashboard/AddCategory";
import AddProduct from "./Sub_Component/Dashboard/AddProduct";
import AddFilter from "./Sub_Component/Dashboard/AddFilter";
import Orders from "./Sub_Component/Dashboard/Orders";
import AllProducts from "./Sub_Component/Dashboard/AllProducts";
import AllCategory from "./Sub_Component/Dashboard/AllCategory";
import AddFlavour from "./Sub_Component/Dashboard/AddFlavour";
import EditCategory from "./Sub_Component/Dashboard/EditCategory";
import EditProduct from "./Sub_Component/Dashboard/EditProduct";
import AllFilters from "./Sub_Component/Dashboard/AllFilters";
import EditFilter from "./Sub_Component/Dashboard/EditFilter";
import AllFlavours from "./Sub_Component/Dashboard/AllFlavours";
import EditFlavour from "./Sub_Component/Dashboard/EditFlavour";

import ProfilePage from "./Sub_Component/Dashboard/ProfilePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<MainPage />} />
            <Route path="/dashboard/addCategory" element={<AddCategory />} />
            <Route
              path="/dashboard/editCategory/:catId"
              element={<EditCategory />}
            />
            <Route
              path="/dashboard/editProduct/:catId/:catName/:prodId"
              element={<EditProduct />}
            />
            <Route path="/dashboard/all_category" element={<AllCategory />} />
            <Route path="/dashboard/addProduct" element={<AddProduct />} />
            <Route path="/dashboard/allFlavours" element={<AllFlavours />} />
            <Route path="/dashboard/addFlavour" element={<AddFlavour />} />
            <Route
              path="/dashboard/editFlavour/:flavId"
              element={<EditFlavour />}
            />
            <Route path="/dashboard/allFilters" element={<AllFilters />} />
            <Route path="/dashboard/addFilter" element={<AddFilter />} />
            <Route
              path="/dashboard/editFilter/:catId/:catName/:filId"
              element={<EditFilter />}
            />
            <Route path="/dashboard/all_product" element={<AllProducts />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
