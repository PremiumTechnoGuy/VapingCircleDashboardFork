import { useState } from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./allproduct.css";
import DashboardNavbar from "./DashboardNavbar";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { ToastContainer, toast } from "react-toastify";

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

function AllProducts() {
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
    const id = toast.loading("Deleting Category...");

    axios
      .delete(`${apiUrl}/api/v1/product/${pId}`)
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        handleCategoryChange("");
        handleFilterProducts("");
        toast.update(id, {
          render: "Deleted Category Successfully!",
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
      <div class=" mt-24 absolute lg:left-[250px]">
        <h2 class="text-xl font-bold mb-5 text-center">All Products</h2>
        <span class="flex justify-center items-center  ">
          {allCategories?.map((cat) => {
            return (
              <div
                class="bg-[#f5f5f5] rounded-full  w-[115px] h-[60px] flex justify-center items-center mr-3"
                style={{ boxShadow: "1px 3px 3px 0px #dee2e6" }}
              >
                <input
                  type="radio"
                  id={cat._id}
                  name="category"
                  value={cat._id}
                  checked={selectedCategory === cat._id}
                  onChange={() => {
                    handleCategoryChange(cat._id);
                    handleFilterProducts(cat._id);
                  }}
                />
                <label
                  htmlFor={cat._id}
                  class="text-[#555555] text-[18px] font-semibold"
                >
                  {cat.name}
                </label>
              </div>
            );
          })}
        </span>

        <div>
          <Container fluid className="my-5">
            {chunkedArr?.map((four) => {
              return (
                <Row>
                  {four.map((el) => {
                    return (
                      <Col>
                        <div id="content" class="m-2 relative">
                          <img
                            src={el.coverImage}
                            alt=""
                            //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                          />
                          <div className="d-flex flex-row gap-5">
                            {" "}
                            <div>
                              <p class="text-black font-semibold text-[12px]">
                                {el.name}
                              </p>
                            </div>
                            <p class="text-[#000000] font-semibold  text-[12px]">
                              £{el.basePrice}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(el._id);
                            }}
                            class="rounded-1 p-2 w-26 font-semibold  bg-[#1B94A0] text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllProducts;
