import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

function AllCategory() {
  // const [allCategories, setAllCategories] = React.useState([]);
  const [chunkedArr, setChunkedArr] = React.useState([]);

  const getAllCat = () => {
    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        // setAllCategories(res.data.data);
        setChunkedArr(chunkArray(res.data.data, 4));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAllCat();
  }, []);

  const handleDelete = (catId) => {
    const id = toast.loading("Deleting Category...");

    axios
      .delete(`${apiUrl}/api/v1/category/${catId}`)
      .then((res) => {
        console.log(res.data);
        getAllCat();
        toast.update(id, {
          render: "Deleted Category Successfully!",
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
          <h2 class="text-xl font-bold mb-5 text-center">All Categories</h2>
          <Container fluid className="my-5">
            {chunkedArr?.map((chunk) => {
              return (
                <Row>
                  {chunk.map((cat) => {
                    return (
                      <Col>
                        <div id="content" class="m-2 relative">
                          <img
                            src={cat.image}
                            alt=""
                            class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                          />
                          <div className="">
                            {" "}
                            <div>
                              <p class="text-black font-semibold my-2 text-center text-[15px]">
                                {cat.name}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(cat._id);
                                }}
                                class="rounded-1 p-2 w-32 font-semibold  bg-[#1B94A0] text-white"
                              >
                                Delete Category
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}

            {/* <Row className="md:block hidden">
              <Col md={3}>
                <div>
                  <img src="https://ik.imagekit.io/p2slevyg1/pod-system-1.d5bee5d451c2fb3fb0c5.png?updatedAt=1705784663074" />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black font-semibold my-2 text-center text-[15px]">
                        Pods
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row> */}
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllCategory;
