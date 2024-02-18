import { useState } from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./allproduct.css";
import DashboardNavbar from "./DashboardNavbar";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

function AllProducts() {
  const nav = useNavigate();

  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [chunkedArr, setChunkedArr] = React.useState([]);

  const getAllCat = () => {
    const id = toast.loading("Fetching Categories...");
    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        setAllCategories(res.data.data);
        toast.update(id, {
          render: "Loaded Categories Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const getAllProducts = () => {
    const id = toast.loading("Fetching Products...");
    axios
      .get(`${apiUrl}/api/v1/product`)
      .then((res) => {
        setAllProducts(res.data.data);
        console.log(res.data.data);
        toast.update(id, {
          render: "Loaded Products Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAllCat();
    getAllProducts();
  }, []);

  const handleDelete = (pId) => {
    const id = toast.loading("Deleting Product...");

    axios
      .delete(`${apiUrl}/api/v1/product/${pId}`)
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        handleCategoryChange("");
        handleFilterProducts("");
        toast.update(id, {
          render: "Deleted Product Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleFilterProducts = (catId) => {
    const filteredProducts = allProducts.filter((p) => p.category === catId);
    setChunkedArr(chunkArray(filteredProducts, 4));
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="mt-24 absolute lg:left-[250px]">
        <div className="d-flex justify-between">
          <h2 className="text-xl font-bold mb-5 text-center">All Products</h2>
          <button
            onClick={() => nav("/dashboard/addProduct")}
            className="rounded-1 p-1 font-semibold bg-[#1B94A0] text-white text-[16px] position-fixed  end-0 m-4"
          >
            + Add New Product
          </button>
        </div>
        <div className="dropdown">
          <button
            className="btn bg-[#1b94a0] btn-light text-white dropdown-toggle"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Category
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
            {allCategories.map((cat) => (
              <li key={cat._id}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleCategoryChange(cat._id);
                    setSelectedCategoryName(cat.name);
                    handleFilterProducts(cat._id);
                  }}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
        </div>

        <div>
          <Container fluid className="my-5">
            {chunkedArr?.map((four) => (
              <Row key={four[0]._id}>
                {four.map((el) => (
                  <Col key={el._id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <div className="m-2 relative product-card">
                        <img style={{ width: "18rem", height: "14rem" }}
                          src={el.coverImage.replace(
                            "/product",
                            "/tr:ar-1-1,w-285.5/product"
                          )}
                          loading="lazy"
                          alt=""
                          className="product-image"
                        />
                        <div className="product-details1">
                          <div className="d-flex justify-between w-100">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(el._id);
                              }}
                              className="rounded-1 p-1 w-24 font-semibold bg-[#1B94A0] text-white text-[14px] delete-button"
                            >
                              Delete
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                nav(
                                  `/dashboard/editProduct/${selectedCategory}/${selectedCategoryName}/${el._id}`
                                );
                              }}
                              className="rounded-1 p-1 w-24 font-semibold bg-[#1B94A0] text-white text-[14px] edit-button"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        <div className=" card-body product-info">
                          <p className="text-black font-semibold text-[16px]">
                            {el.name}
                          </p>
                          <p className="text-[#000000] font-semibold text-[12px]">
                            £{el.basePrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ))}
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllProducts;