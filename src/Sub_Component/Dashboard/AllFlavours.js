import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col, NavLink } from "react-bootstrap";
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

function AllFlavour() {
  const nav = useNavigate();
  // const [allCategories, setAllCategories] = React.useState([]);
  const [chunkedArr, setChunkedArr] = React.useState([]);

  const getAllFlavours = () => {
    axios
      .get(`${apiUrl}/api/v1/flavour`)
      .then((res) => {
        // setAllCategories(res.data.data);
        setChunkedArr(chunkArray(res.data.data, 4));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAllFlavours();
  }, []);

  const handleDelete = (flavId) => {
    const id = toast.loading("Deleting Category...");

    axios
      .delete(`${apiUrl}/api/v1/flavour/${flavId}`)
      .then((res) => {
        console.log(res.data);
        getAllFlavours();
        toast.update(id, {
          render: "Deleted Flavour Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px]">
          <div className="d-flex justify-between">
            <h2 class="text-xl font-bold mb-5 text-center">All Flavours</h2>
            <button
              onClick={() => nav("/dashboard/addFlavour")}
              class="rounded-1 p-1 w-28 font-semibold  bg-[#1B94A0] text-white text-[14px]"
            >
              Add New Flavour
            </button>
          </div>
          <Container fluid className="my-5">
            {chunkedArr?.map((chunk) => {
              return (
                <Row>
                  {chunk.map((cat) => {
                    return (
                      <Col>
                        <div id="content" class="m-2 relative">
                          <img
                            src={cat.image.replace(
                              "/category",
                              "/tr:ar-1-1,w-285.5/category"
                            )}
                            loading="lazy"
                            alt=""
                            class="transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                            id="image"
                          />
                          <div className="">
                            {" "}
                            <div>
                              <p class="text-black font-semibold my-2 text-center text-[15px]">
                                {cat.name}
                              </p>
                              <div className="d-flex justify-between">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(cat._id);
                                  }}
                                  class="rounded-1 p-1 w-24 font-semibold  bg-[#1B94A0] text-white text-[14px]"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // handleDelete(cat._id);
                                    nav(`/dashboard/editFlavour/${cat._id}`);
                                  }}
                                  class="rounded-1 p-1 w-24 font-semibold  bg-[#1B94A0] text-white text-[14px]"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
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

export default AllFlavour;
