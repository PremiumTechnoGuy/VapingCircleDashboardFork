import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiUrl } from "../../data/env";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function AddCategory() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isLoadingState, setIsLoadingState] = useState(false);

  // form value states
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [priorityNum, setPriorityNum] = useState(1);
  const [availableRetail, setAvailableRetail] = useState("true");
  const [availableWholesale, setAvailableWholesale] = useState("false");

  const handleAddNewCategory = (e) => {
    e.preventDefault();
    // setIsLoadingState(true);
    const id = toast.loading("Please wait...");

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const payload = {
      name: categoryName,
      description,
      priority: priorityNum,
      availableRetail: availableRetail === "true" ? true : false,
      availableWholesale: availableWholesale === "true" ? true : false,
    };

    axios
      .post(`${apiUrl}/api/v1/category`, payload, config)
      .then((res) => {
        // setIsLoadingState(false);
        console.log(res.data);
        toast.update(id, {
          render: "Created Category Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setCategoryName("");
        setDescription("");
        setPriorityNum(1);
        setAvailableRetail(true);
        setAvailableWholesale(false);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message ||
            "Error Occured! See more using console!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const showToastMessage = (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");

    setTimeout(() => {
      toast.update(id, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }, 5000);

    // toast.success("Success Notification !", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  };

  return (
    <div>
      <DashboardNavbar />
      <div class=" mt-24 absolute lg:left-[260px]  z-5">
        <Container>
          <h2 class="font-bold text-xl">Main Category</h2>
          <p class="font-bold mt-4">Add New Category</p>
          <Form sm={12}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="" sm={6}>
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <Form.Label class="text-[#707070]  font-semibold py-2 ">
                  Choose Cover Image
                </Form.Label>
                <Form.Control
                  type="file"
                  style={{ height: "170px", width: "311px" }}
                  accept="image/png, image/jpeg"
                />
                <div class="absolute text-center " style={{ marginTop: -94 }}>
                  {/* <p class=" text-xl px-36 text-[#707070]">
                    <FiEdit />
                  </p> */}
                  <button
                    class="rounded-1 p-2 bg-[#1B94A0] text-white"
                    style={{ marginTop: 37 }}
                  >
                    Upload Selected Image
                  </button>
                </div>
                {/* <p
                  class="absolute text-center px-24"
                  style={{ marginTop: -66 }}
                >
                  choose an image
                </p> */}
              </Form.Group>
            </Row>

            <Row className="mb-4" style={{ marginTop: -119 }}>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Priority Number
                </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={priorityNum}
                  onChange={(e) => setPriorityNum(Number(e.target.value))}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Choose an icon
                </Form.Label>
                <Form.Control
                  type="file"
                  style={{ height: "40px", width: "45px" }}
                  accept="image/png, image/jpeg"
                />
                <div class="absolute text-center " style={{ marginTop: -28 }}>
                  <button
                    class="rounded-1 p-2 bg-[#1B94A0] text-white"
                    style={{ marginTop: 37 }}
                  >
                    Upload Selected Icon
                  </button>
                  {/* <p class=" px-3 text-[#707070]">
                    <FiEdit />
                  </p> */}
                </div>
              </Form.Group>
            </Row>

            {/* small screen  */}
            <Row className="mb-4 ">
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="mt-16 py-3 block md:hidden "
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Priority Number
                </Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="block md:hidden "
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Icon
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ height: "40px", width: "45px" }}
                />
                <div class="absolute text-center " style={{ marginTop: -28 }}>
                  <p class=" px-3 text-[#707070]">
                    <FiEdit />
                  </p>
                </div>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/* <Form.Group as={Col} controlId="">
                <label for="" class="text-[#707070] font-semibold py-2">
                  Filters
                </label>
                <select id="" class="form-select">
                  <option muted hidden selected>
                    Choose Filters
                  </option>
                  <option>Chocolate</option>
                  <option>Ice Cream</option>
                  <option>Honey</option>
                </select>
              </Form.Group> */}
              {/* <Form.Group as={Col} controlId="">
                <Button
                  onClick={handleShow}
                  class="bg-[#59A0B8] text-white mt-[35px] px-5 lg:text-xl font-semibold  py-2 rounded "
                >
                  Varients
                </Button>
              </Form.Group> */}
              <Form.Group as={Col} controlId="">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Available For Retail
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={availableRetail}
                  onChange={(e) => setAvailableRetail(e.target.value)}
                >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Available For Wholesale
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={availableWholesale}
                  onChange={(e) => setAvailableWholesale(e.target.value)}
                >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="" className="block md:hidden">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Filters
                </Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <label class="text-[#707070] font-semibold py-2">Description</label>

            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>

            <Row>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="block md:hidden"
              >
                <Form.Label class="text-[#707070] font-semibold py-2 "></Form.Label>
                <Form.Control
                  type="text"
                  style={{ height: "170px", width: "311px" }}
                />
                <div class="absolute text-center " style={{ marginTop: -94 }}>
                  <h1 class=" text-xl px-36 text-[#707070]">
                    <FiEdit />
                  </h1>
                </div>
                <p
                  class="absolute text-center px-24"
                  style={{ marginTop: -66 }}
                >
                  choose an image
                </p>
              </Form.Group>
            </Row>

            <div class="flex flex-col justify-start items-start mt-3 mb-2 ">
              <button
                class="bg-[#59A0B8] text-white px-5 lg:text-xl font-semibold  py-2 rounded "
                onClick={handleAddNewCategory}
              >
                Submit
              </button>
            </div>
          </Form>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Varients</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>input 1</Form.Label>
              <Form.Control placeholder="input1" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>input 2</Form.Label>
              <Form.Control placeholder="input2" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleClose}
              class="bg-[#59A0B8] text-white px-5 lg:text-xl font-semibold  py-2 rounded "
            >
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddCategory;
