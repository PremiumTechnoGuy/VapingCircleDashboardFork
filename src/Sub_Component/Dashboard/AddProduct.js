import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FiEdit } from "react-icons/fi";

function AddProduct() {
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px] z-5">
          <Container class="">
            <h2 class="font-bold text-xl">Add Product</h2>
            <Row class="">
              <Col md={4}>
                <Form.Group as={Col} controlId="" sm={4} className=" mt-3">
                  <Form.Label class="text-[#707070]  font-semibold py-2 "></Form.Label>
                  <Form.Control
                    type="text"
                    style={{ height: "170px", width: "278px" }}
                  />
                  <div class="absolute text-center " style={{ marginTop: -94 }}>
                    <p class=" text-xl px-36 text-[#707070]">
                      <FiEdit />
                    </p>
                  </div>
                  <p
                    class="absolute text-center px-24"
                    style={{ marginTop: -66 }}
                  >
                    choose an image
                  </p>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={8}>
                <Form>
                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Name
                      </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Select Category
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Price
                      </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Quantity
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="" md={2}>
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Variant
                      </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2"></Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                      <button
                        class="rounded-1 p-2  text-white"
                        style={{ marginTop: 37 }}
                      >
                        {" "}
                        <RiDeleteBinLine class="text-[#707070] text-2xl" />
                      </button>
                    </Form.Group>
                    <Form.Group as={Col} controlId="" class="flex ">
                      <Button
                        // class="rounded-1  bg-[#1B94A0] text-white"

                        style={{
                          marginTop: 37,
                          marginRight: 5,
                          backgroundColor: "#1B94A0",
                          color: "white",
                        }}
                        onClick={handleShow}
                        variant="info"
                      >
                        Add Variant
                      </Button>
                      <Button
                        // class="rounded-1  bg-[#1B94A0] text-white"

                        style={{
                          marginTop: 37,
                          backgroundColor: "#1B94A0",
                          color: "white",
                        }}
                        onClick={handleShowFilter}
                        variant="info"
                      >
                        Add Filter
                      </Button>
                    </Form.Group>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body>
                        <Form.Group className="mb-3 flex justify-center items-center">
                          <Form.Label class="font-semibold">
                            Variant Type:
                          </Form.Label>
                          <Form.Control placeholder="" />
                        </Form.Group>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="">
                            <Form.Label class="font-semibold">Value</Form.Label>
                            <Form.Control />
                          </Form.Group>
                          <Form.Group as={Col} controlId="">
                            <Form.Label class="font-semibold">Price</Form.Label>
                            <Form.Control />
                          </Form.Group>

                          <Form.Group as={Col} controlId="">
                            <Form.Label class="font-semibold">
                              Quantity
                            </Form.Label>
                            <Form.Control />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} xs={4} controlId="">
                            <Form.Label class="font-semibold">SKU</Form.Label>
                            <Form.Control type="" placeholder="" />
                          </Form.Group>

                          <Form.Group as={Col} xs={6} controlId="">
                            <Form.Label class="font-semibold">Image</Form.Label>
                            <Form.Control type="file" />
                          </Form.Group>
                          <Form.Group as={Col} xs={2} controlId="">
                            <Form.Label></Form.Label>
                            <RiDeleteBinLine class="text-xl mt-2 cursor-pointer" />
                          </Form.Group>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={handleClose}
                          variant="info"
                          class="rounded-1 py-2 px-2 bg-[#1B94A0] text-white hover:bg-[#1B94A0] hover:text-white"
                        >
                          Add Model
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal show={showFilter} onHide={handleCloseFilter}>
                      <Modal.Body>
                        <Form.Group className="mb-3 flex justify-center items-center">
                          <Form.Label class="font-semibold">
                            Filter Name:
                          </Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={handleCloseFilter}
                          variant="info"
                          class="rounded-1 py-2 px-2 bg-[#1B94A0] text-white hover:bg-[#1B94A0] hover:text-white"
                        >
                          Add Filter
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Row>
                </Form>
              </Col>
            </Row>
            <button class="rounded-1 p-2 w-32 font-semibold   mt-4 bg-[#1B94A0] text-white">
              Submit
            </button>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
