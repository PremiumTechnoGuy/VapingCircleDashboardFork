import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FiEdit } from "react-icons/fi";

function AddCategory() {
  return (
    <div>
      <DashboardNavbar />
      <div class=" mt-24 absolute lg:left-[260px]  z-5" >
        <Container>
          <h2 class="font-bold text-xl">Main Category</h2>
          <p class="font-bold mt-4">Add New Category</p>
          <Form sm={12}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="" sm={6}>
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Name
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <Form.Label class="text-[#707070]  font-semibold py-2 "></Form.Label>
                <Form.Control
                  type="text"
                  style={{ height: "170px", width: "311px" }}
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
            </Row>

            <Row className="mb-4" style={{ marginTop: -119 }}>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Priority
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
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

            {/* small screen  */}
            <Row className="mb-4 ">
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="mt-16 py-3 block md:hidden "
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Priority
                </Form.Label>
                <Form.Control type="text" />
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
              <Form.Group as={Col} controlId="" className="md:block hidden">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Filters
                </Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Available Retail
                </Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Available Wholesale
                </Form.Label>
                <Form.Control />
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
              <button class="bg-[#59A0B8] text-white px-5 lg:text-xl font-semibold  py-2 rounded ">
                Submit
              </button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default AddCategory;
