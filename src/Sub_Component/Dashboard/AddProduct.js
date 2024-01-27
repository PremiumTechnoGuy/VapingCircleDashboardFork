/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FiEdit } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../data/env";

function slugify(str) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

function VariantOption({ variantOptionsObj, selectedVariant, i }) {
  const [optionVal, setOptionVal] = React.useState(
    variantOptionsObj.optionValue
  );
  const [optionPrc, setOptionPrc] = React.useState(
    variantOptionsObj.optionPrice
  );
  const [optionQuant, setOptionQuant] = React.useState(
    variantOptionsObj.optionQuantity
  );
  const [optionStk, setOptionStk] = React.useState(variantOptionsObj.optionSku);

  return (
    <span>
      <h1 class="font-bold text-xl underline">Option Info:</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="">
          <Form.Label class="font-semibold">Value</Form.Label>
          <Form.Control
            type="text"
            id={`${slugify(selectedVariant)}-${i}`}
            data-value={optionVal}
            value={optionVal}
            onChange={(e) => setOptionVal(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label class="font-semibold">Price</Form.Label>
          <Form.Control
            type="number"
            min={0}
            id={`${slugify(selectedVariant)}-${i}`}
            data-price={optionPrc}
            value={optionPrc}
            onChange={(e) => setOptionPrc(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="">
          <Form.Label class="font-semibold">Quantity</Form.Label>
          <Form.Control
            type="number"
            min={1}
            id={`${slugify(selectedVariant)}-${i}`}
            data-quantity={optionQuant}
            value={optionQuant}
            onChange={(e) => setOptionQuant(Number(e.target.value))}
          />
        </Form.Group>

        {/* new row should be here */}
        <Form.Group as={Col} xs={2} controlId="">
          <Form.Label class="font-semibold">SKU</Form.Label>
          <Form.Control
            type=""
            placeholder=""
            id={`${slugify(selectedVariant)}-${i}`}
            data-sku={optionStk}
            value={optionStk}
            onChange={(e) => setOptionStk(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group as={Col} xs={2} controlId="">
          <Form.Label></Form.Label>
          <RiDeleteBinLine class="text-xl mt-2 cursor-pointer" />
        </Form.Group> */}
      </Row>
    </span>
  );
  {
    /* <Row className="mb-3">
    <Form.Group as={Col} xs={4} controlId="">
      <Form.Label class="font-semibold">SKU</Form.Label>
      <Form.Control type="" placeholder="" />
    </Form.Group>

    <Form.Group as={Col} xs={6} controlId="">
      <Form.Label class="font-semibold">
        Image
      </Form.Label>
      <Form.Control type="file" />
    </Form.Group>
    <Form.Group as={Col} xs={2} controlId="">
      <Form.Label></Form.Label>
      <RiDeleteBinLine class="text-xl mt-2 cursor-pointer" />
    </Form.Group>
  </Row> */
  }
}

function AddProduct() {
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  // custom hooks
  const [fetchedCategories, setFetchedCategories] = React.useState([]);

  React.useEffect(() => {
    const id = toast.loading("Fetching Data... Please Wait!");

    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        setFetchedCategories(res.data.data);
        console.log(res.data.data);
        toast.update(id, {
          render: "Successfully Fetched Data!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });
  }, []);

  // form states
  const [productName, setProductName] = React.useState("");
  const [available, setAvailable] = React.useState("true");
  const [basePrice, setBasePrice] = React.useState(0);
  const [sku, setSku] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [coverImage, setCoverImage] = React.useState("");
  const [imagesArr, setImagesArr] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [variantsArray, setVariantsArray] = React.useState([]);
  const [selectedVariantType, setSelectedVariantType] = React.useState("");
  const [typedNewVariant, setTypedNewVariant] = React.useState("");
  const [finalVariantsArray, setFinalVariantsArray] = React.useState([]);

  const [selectedVariantOptionsArr, setSelectedVariantOptionsArr] =
    React.useState([
      {
        optionValue: "",
        optionPrice: 0,
        optionQuantity: 1,
        optionSku: "",
      },
    ]);

  const handleCloseVariantModal = () => {
    const newArrayOfOptionsObjects = [];
    selectedVariantOptionsArr.forEach((_, i) => {
      const newObj = {};
      document
        .querySelectorAll(`#${slugify(selectedVariantType)}-${i}`)
        .forEach((el) => {
          if (el.dataset.price) newObj.optionPrice = Number(el.dataset.price);
          if (el.dataset.value) newObj.optionValue = el.dataset.value;
          if (el.dataset.quantity)
            newObj.optionQuantity = Number(el.dataset.quantity);
          if (el.dataset.sku) newObj.optionSku = el.dataset.sku;
        });
      newArrayOfOptionsObjects.push(newObj);
    });
    console.log(newArrayOfOptionsObjects);

    setFinalVariantsArray((arr) => [
      ...arr,
      {
        variantType: selectedVariantType,
        options: newArrayOfOptionsObjects,
      },
    ]);
    console.log(finalVariantsArray);
    setSelectedVariantType("");
  };

  const handleSubmitNewProduct = (e) => {
    e.preventDefault();
    console.log({
      productName,
      description,
      available,
      basePrice,
      sku,
      selectedCategory,
    });
  };

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px] z-5">
          <Container class="">
            <h2 class="font-bold text-xl">Add Product</h2>
            <Row class="">
              {/* Images Components */}
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
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Select Category
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option></option>
                        {fetchedCategories?.map((cat) => (
                          <option value={cat._id}>{cat.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Base Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        value={basePrice}
                        onChange={(e) => setBasePrice(Number(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Available
                      </Form.Label>
                      <Form.Select
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        SKU
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="" md={2}>
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Variant
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={typedNewVariant}
                        onChange={(e) => setTypedNewVariant(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                      <button
                        class="rounded-1 p-2 mt-[2rem] bg-[#1B94A0] text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setVariantsArray((arr) => [...arr, typedNewVariant]);
                          setTypedNewVariant("");
                        }}
                      >
                        Add Variant Type
                      </button>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Current Variant Types
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setSelectedVariantType(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={""}></option>
                        {variantsArray?.map((variant, i) => (
                          <option key={i} value={variant}>
                            {variant}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                      <button
                        class="rounded-1 p-2  text-white"
                        style={{ marginTop: 37 }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (variantsArray.length >= 1) {
                            const newArr = [...variantsArray];
                            newArr.splice(
                              variantsArray.indexOf(selectedVariantType),
                              1
                            );
                            setVariantsArray(newArr);
                            setSelectedVariantType("");
                          }
                        }}
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
                        Add Options
                      </Button>
                      {/* <Button
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
                      </Button> */}
                    </Form.Group>

                    <label class="text-[#707070] font-semibold py-2">
                      Description
                    </label>

                    <FloatingLabel controlId="floatingTextarea2" label="">
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FloatingLabel>

                    {/* variants modal component */}
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body>
                        <Form.Group className="mb-3 flex justify-center items-center">
                          <Form.Label class="font-semibold">
                            Variant Type:
                          </Form.Label>
                          <Form.Control
                            placeholder=""
                            value={selectedVariantType}
                          />
                        </Form.Group>
                        {selectedVariantOptionsArr?.map(
                          (variantOptionsObj, i) => (
                            <VariantOption
                              key={i}
                              selectedVariant={selectedVariantType}
                              variantOptionsObj={variantOptionsObj}
                              i={i}
                            />
                          )
                        )}
                        <Button
                          style={{
                            marginTop: 10,
                            backgroundColor: "#1B94A0",
                            color: "white",
                          }}
                          variant="info"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedVariantOptionsArr((arr) => {
                              const newArr = [...arr];
                              newArr.push({
                                optionValue: "",
                                optionPrice: "",
                                optionQuantity: 1,
                                optionSku: "",
                              });
                              return newArr;
                            });
                          }}
                        >
                          New Option
                        </Button>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCloseVariantModal();
                            handleClose();
                          }}
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
            <button
              onClick={handleSubmitNewProduct}
              class="rounded-1 p-2 w-32 font-semibold   mt-4 bg-[#1B94A0] text-white"
            >
              Submit
            </button>
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
