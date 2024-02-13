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

function AllFilters() {
  const nav = useNavigate();

  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allFilters, setAllFilters] = useState([]);
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

  const getAllFilters = () => {
    const id = toast.loading("Fetching Filters...");
    axios
      .get(`${apiUrl}/api/v1/filter`)
      .then((res) => {
        setAllFilters(res.data.data);
        toast.update(id, {
          render: "Loaded Filters Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAllCat();
    getAllFilters();
  }, []);

  const handleDelete = (pId) => {
    const id = toast.loading("Deleting Filter...");

    axios
      .delete(`${apiUrl}/api/v1/filter/${pId}`)
      .then((res) => {
        getAllFilters();
        handleCategoryChange("");
        handleFilterProducts("");
        toast.update(id, {
          render: "Deleted Filter Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleFilterProducts = (catId) => {
    const filteredProducts = allFilters.filter((p) => p.categoryId === catId);
    setChunkedArr(chunkArray(filteredProducts, 4));
  };

  return (
    <div>
      <DashboardNavbar />
      <div class=" mt-24 absolute lg:left-[250px]">
        <div className="d-flex justify-between">
          <h2 class="text-xl font-bold mb-5 text-center">All Filters</h2>
          <button
            onClick={() => nav("/dashboard/addFilter")}
            class="rounded-1 p-1 w-28 font-semibold  bg-[#1B94A0] text-white text-[14px]"
          >
            Add New Filter
          </button>
        </div>
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
                    setSelectedCategoryName(cat.name);
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
                          {/* <img
                            src={el.coverImage.replace(
                              "/product",
                              "/tr:ar-1-1,w-285.5/product"
                            )}
                            loading="lazy"
                            alt=""
                            class="transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                          /> */}
                          <div className="d-flex flex-row gap-5">
                            <p class="text-black font-semibold text-[12px]">
                              {el.name}
                            </p>
                          </div>
                          <div className="d-flex justify-between w-100">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(el._id);
                              }}
                              class="rounded-1 p-1 w-24 font-semibold  bg-[#1B94A0] text-white text-[14px]"
                            >
                              Delete
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                nav(
                                  `/dashboard/editFilter/${selectedCategory}/${selectedCategoryName}/${el._id}`
                                );
                              }}
                              class="rounded-1 p-1 w-24 font-semibold  bg-[#1B94A0] text-white text-[14px]"
                            >
                              Edit
                            </button>
                          </div>
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

export default AllFilters;
