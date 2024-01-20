import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { RiDeleteBinLine } from "react-icons/ri";

import { FiEdit } from "react-icons/fi";

function AddProduct() {
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
                    <Form.Group as={Col} controlId="">
                      <button
                        class="rounded-1 p-2 bg-[#1B94A0] text-white"
                        style={{ marginTop: 37 }}
                      >
                        Add Variant
                      </button>
                    </Form.Group>
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
