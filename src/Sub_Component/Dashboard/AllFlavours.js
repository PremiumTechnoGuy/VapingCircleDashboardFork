import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AllFlavour.css"; // Import your CSS file

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

function AllFlavour() {
  const nav = useNavigate();
  const [chunkedArr, setChunkedArr] = React.useState([]);

  const getAllFlavours = () => {
    axios
      .get(`${apiUrl}/api/v1/flavour`)
      .then((res) => {
        setChunkedArr(chunkArray(res.data.data, 4));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAllFlavours();
  }, []);

  const handleDelete = (flavId) => {
    const id = toast.loading("Deleting Flavour...");

    axios
      .delete(`${apiUrl}/api/v1/flavour/${flavId}`)
      .then((res) => {
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
        <div className="mt-24 absolute lg:left-[260px]">
          <div className="d-flex justify-between">
            <h2 className="text-xl font-bold mb-5 text-center">All Flavours</h2>
            <button
              onClick={() => nav("/dashboard/addFlavour")}
              className="rounded-1 p-1 font-semibold bg-[#1B94A0] text-white text-[16px] position-fixed end-0 m-4"
            >
              + Add Flavour
            </button>
          </div>
          <Container fluid className="my-5">
            {chunkedArr?.map((chunk, index) => (
              <Row key={index}>
                {chunk.map((flav) => (
                  <Col key={flav._id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <div className="m-2 relative image-container">
                        <img style={{ width: "18rem", height: "12rem" }}
                          src={flav.image.replace(
                            "/category",
                            "/tr:ar-1-1,w-285.5/category"
                          )}
                          loading="lazy"
                          alt=""
                          className="flavour-image"
                        />
                        <div className="overlay-buttons">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(flav._id);
                            }}
                            className="rounded-1 p-2 w-24 font-semibold bg-danger text-white text-[14px]"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              nav(`/dashboard/editFlavour/${flav._id}`);
                            }}
                            className="rounded-1 p-1 w-24 font-semibold bg-[#1B94A0] text-white text-[14px]"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flavour-details">
                          <p className="text-black font-semibold my-2 text-center text-[15px]">
                            {flav.name}
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

export default AllFlavour;