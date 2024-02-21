/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoCaretBackCircleOutline } from "react-icons/io5";

import { FiEdit } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();

  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  // custom hooks
  const [fetchedCategories, setFetchedCategories] = React.useState([]);
  const [fetchedFilters, setFetchedFilters] = React.useState([]);

  React.useEffect(() => {
    const id1 = toast.loading("Fetching Categories... Please Wait!");
    const id2 = toast.loading("Fetching Filters... Please Wait!");
    const id3 = toast.loading("Fetching Flavours... Please Wait!");
    const id4 = toast.loading("Fetching Offers... Please Wait!");

    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        setFetchedCategories(res.data.data);
        // console.log(res.data.data);
        toast.update(id1, {
          render: "Successfully Fetched Categories!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id1, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });

    axios
      .get(`${apiUrl}/api/v1/filter`)
      .then((res) => {
        // console.log(res.data);
        setFetchedFilters(res.data.data);
        toast.update(id2, {
          render: "Successfully Fetched Filters!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id2, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });

    axios
      .get(`${apiUrl}/api/v1/flavour`)
      .then((res) => {
        setAllFlavours(res.data.data);
        toast.update(id3, {
          render: "Successfully Fetched Flavours!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id3, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });

    axios
      .get(`${apiUrl}/api/v1/offer`)
      .then((res) => {
        setAllOffers(res.data.data);
        toast.update(id4, {
          render: "Successfully Fetched Offers!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id4, {
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
  // const [coverImage, setCoverImage] = React.useState("");
  // const [imagesArr, setImagesArr] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [filteredFilters, setFilteredFilters] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [selectedFilterObj, setSelectedFilterObj] = React.useState(null);
  const [filteredFilterOptions, setFilteredFilterOptions] = React.useState([]);
  const [selectedFilteredFilterOption, setSelectedFilteredFilterOption] =
    React.useState("");
  const [finalFiltersObjArray, setFinalFiltersObjArray] = React.useState([]);

  const [allFlavours, setAllFlavours] = React.useState([]);
  // const [chosenFlavoursArray, setChosenFlavoursArray] = React.useState([]);
  const [finalFlavoursObjArray, setFinalFlavoursObjArray] = React.useState([]);
  const [selectedFlavour, setSelectedFlavour] = React.useState("");
  const [selectedFlavourObj, setSelectedFlavourObj] = React.useState(null);
  const [filteredFlavourSubFlavours, setFilteredFlavourSubFlavours] =
    React.useState([]);
  const [
    selectedFilteredFlavourSubFlavour,
    setSelectedFilteredFlavourSubFlavour,
  ] = React.useState("");

  const [variantsArray, setVariantsArray] = React.useState([]);
  const [selectedVariantType, setSelectedVariantType] = React.useState("");
  const [typedNewVariant, setTypedNewVariant] = React.useState("");
  const [finalVariantsArray, setFinalVariantsArray] = React.useState([]);

  const [featured, setFeatured] = React.useState("false");

  const [selectedVariantOptionsArr, setSelectedVariantOptionsArr] =
    React.useState([
      {
        optionValue: "",
        optionPrice: 0,
        optionQuantity: 1,
        optionSku: "",
      },
    ]);

  // hooks vape deals
  const [selectedOffer, setSelectedOffer] = React.useState({
    isOffer: false,
    offerId: "",
  });
  const [allOffers, setAllOffers] = React.useState([]);

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
    const id = toast.loading("Creating New Product...");

    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    const payload = {
      available: available === "true" ? true : false,
      featured: featured === "true" ? true : false,
      name: productName,
      basePrice,
      sku,
      description,
      coverImage: "cover.jpeg",
      images: ["1.jpeg", "2.jpeg", "3.jpeg"],
      category: selectedCategory,
      variants: finalVariantsArray,
      chosenFilters: finalFiltersObjArray,
      chosenFlavours: finalFlavoursObjArray,
      offer: selectedOffer,
    };
    // console.log(payload);

    axios
      .post(`${apiUrl}/api/v1/product`, payload)
      .then((res) => {
        console.log(res.data);
        toast.update(id, {
          render: "Created Product Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Upload Cover Image
        if (uploadingImage) handleUploadImage(res.data.data._id);

        // Upload Multiple Images
        if (multipleUpload) handleUploadImages(res.data.data._id);

        setProductName("");
        setDescription("");
        setBasePrice(0);
        setFinalVariantsArray([]);
        setVariantsArray([]);
        setSelectedVariantType("");
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

  const [image, setImage] = React.useState({ preview: "", data: "" });
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const handleUploadImage = (pId) => {
    const id = toast.loading("Uploading Cover Image...");
    let formData = new FormData();
    formData.append("image", image.data);

    axios
      .post(`${apiUrl}/api/v1/product/imageUpload?productId=${pId}`, formData)
      .then((res) => {
        console.log(res.data);
        console.log("uploaded image");
        // alert("successfully uploaded image!");
        // return 'success';
        toast.update(id, {
          render: "Uploaded Cover Image Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setImage({ preview: "", data: "" });
        setUploadingImage(false);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message ||
            "Cover Image Upload Error! See more using console!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  // Multiple Image Upload
  const [files, setFiles] = useState([]);
  const [multipleUpload, setMultipleUpload] = useState(false);

  const handleMultipleFileChange = (e) => {
    if (e.target.files.length > 4) {
      toast("Cannot upload more than 4 images!", {
        type: "warning",
        autoClose: 2500,
        isLoading: false,
      });
    } else setFiles(Array.from(e.target.files));
  };

  const handleUploadImages = (pId) => {
    const id = toast.loading("Uploading Multiple Images...");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    axios
      .post(
        `${apiUrl}/api/v1/product/multipleImageUpload?productId=${pId}`,
        formData
      )
      .then((res) => {
        toast.update(id, {
          render: "Multiple Images Uploaded!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        console.log(res.data);
        setFiles([]);
        setMultipleUpload(false);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message ||
            "Multiple Image Upload Error! See more using console!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  // filters confirm choice
  const handleConfirmFilter = () => {
    // Construct chosenFilters array
    const chosenFilters = [];

    // Find selected flavour
    const selectedFilterObj = filteredFilters.find(
      (filter) => filter._id === selectedFilter
    );

    if (selectedFilterObj) {
      chosenFilters.push({
        filterId: selectedFilterObj._id,
        filterName: selectedFilterObj.name,
        chosenOption: selectedFilteredFilterOption,
      });
    }

    setFinalFiltersObjArray((fil) => {
      const newArr = fil.flat().filter((f) => f.filterId !== selectedFilter);

      return [...newArr, ...chosenFilters];
    });

    // Reset state after extracting data
    setSelectedFilter("");
    setSelectedFilteredFilterOption("");
    setSelectedFilterObj();
  };

  // flavours confirm choice
  const handleConfirmChoice = () => {
    // Construct chosenFilters array
    const chosenFlavours = [];

    // Find selected flavour
    const selectedFlavourObj = allFlavours.find(
      (flavour) => flavour._id === selectedFlavour
    );

    if (selectedFlavourObj) {
      chosenFlavours.push({
        flavourId: selectedFlavourObj._id,
        flavourName: selectedFlavourObj.name,
        chosenSubFlavour: selectedFilteredFlavourSubFlavour,
      });
    }

    setFinalFlavoursObjArray((flv) => {
      const newArr = flv.flat().filter((f) => f.flavourId !== selectedFlavour);

      return [...newArr, ...chosenFlavours];
    });

    // Reset state after extracting data
    setSelectedFlavour("");
    setSelectedFilteredFlavourSubFlavour("");
    setSelectedFlavourObj();
  };

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px] z-5">
          <Container class="">
            <div className="d-flex gap-4 align-items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nav("/dashboard/all_product");
                }}
                class="d-flex gap-2 align-items-center rounded-1 p-2 w-32 font-semibold bg-[#1B94A0] text-white"
              >
                <IoCaretBackCircleOutline />
                <span>Go Back</span>
              </button>
              <h2 class="font-bold text-xl">Add Product</h2>
            </div>
            <Row class="">
              {/* Images Components */}
              <Col md={4}>
                <Form.Group as={Col} controlId="" sm={4} className=" mt-3">
                  <Form.Label class="text-[#707070]  font-semibold py-2 "></Form.Label>
                  <Form.Control
                    type="file"
                    style={{ height: "170px", width: "278px" }}
                    onChange={(e) => {
                      setUploadingImage(true);
                      handleFileChange(e);
                    }}
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
                    Choose a Cover Image
                  </p>
                </Form.Group>
                {/* <button
                  onClick={handleUploadImage}
                  class="rounded-1 p-2 w-32 font-semibold   mt-4 bg-[#1B94A0] text-white"
                >
                  Upload Image
                </button> */}
                <Row>
                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Choose Images (Max 4)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        style={{ height: "40px", width: "145px" }}
                        onChange={(e) => {
                          setMultipleUpload(true);
                          handleMultipleFileChange(e);
                        }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">{/* <FiEdit /> */}</p>
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
                        onChange={(e) => {
                          setSelectedCategory(() => {
                            const changedCat = e.target.value;
                            const newFilters = fetchedFilters.filter(
                              (f) => f.categoryId === changedCat
                            );
                            const finalFiltersArray = newFilters?.map((f) => {
                              return {
                                filterId: f._id,
                                filterName: f.name,
                                chosenOption: "",
                              };
                            });
                            setFilteredFilters(newFilters);
                            setFinalFiltersObjArray(finalFiltersArray);
                            return changedCat;
                          });
                        }}
                      >
                        <option></option>
                        {fetchedCategories?.map((cat) => (
                          <option value={cat._id}>{cat.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label
                        onClick={() =>
                          console.log(finalFlavoursObjArray, "final")
                        }
                        class="text-[#707070]  font-semibold py-2"
                      >
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        1. Select Offer
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setSelectedOffer({
                              isOffer: false,
                              offerId: "",
                            });
                            return;
                          }
                          console.log("test console");

                          const [off] = allOffers.filter(
                            (off) => off._id === e.target.value
                          );

                          setSelectedOffer({
                            isOffer: true,
                            offerId: off._id,
                          });
                        }}
                        aria-label="Default select example"
                        value={selectedOffer}
                      >
                        <option value={""}></option>
                        {allOffers?.map((offer) => (
                          <option key={offer._id} value={offer._id}>
                            {offer.name}
                          </option>
                        ))}
                      </Form.Select>
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
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Featured
                      </Form.Label>
                      <Form.Select
                        value={featured}
                        onChange={(e) => setFeatured(e.target.value)}
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

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        1. Select Filters
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          // console.log(e.target.value);
                          const [fil] = filteredFilters.filter(
                            (fil) => fil._id === e.target.value
                          );

                          setSelectedFilter(() => {
                            setFilteredFilterOptions(fil.options);
                            setSelectedFilterObj(fil);
                            return e.target.value;
                          });
                        }}
                        aria-label="Default select example"
                        value={selectedFilter}
                      >
                        <option value={""}></option>
                        {filteredFilters?.map((filter) => (
                          <option key={filter._id} value={filter._id}>
                            {filter.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        2. Select it's Options
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          console.log(e.target.value);
                          setSelectedFilteredFilterOption(e.target.value);
                        }}
                        aria-label="Default select example"
                        value={selectedFilteredFilterOption}
                      >
                        <option value={""}></option>
                        {filteredFilterOptions?.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="" class="flex ">
                      <Button
                        // class="rounded-1  bg-[#1B94A0] text-white"
                        style={{
                          marginTop: 50,
                          backgroundColor: "#1B94A0",
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleConfirmFilter();
                        }}
                        variant="info"
                      >
                        Confirm Choice
                      </Button>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        1. Select Flavours
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          // console.log(e.target.value);
                          const [fil] = allFlavours.filter(
                            (fil) => fil._id === e.target.value
                          );

                          setSelectedFlavour(() => {
                            setFilteredFlavourSubFlavours(fil.subFlavours);
                            setSelectedFlavourObj(fil);
                            return e.target.value;
                          });
                        }}
                        aria-label="Default select example"
                        value={selectedFlavour}
                      >
                        <option value={""}></option>
                        {allFlavours?.map((flavour) => (
                          <option key={flavour._id} value={flavour._id}>
                            {flavour.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        2. Select Subflavours
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          console.log(e.target.value);
                          setSelectedFilteredFlavourSubFlavour(e.target.value);
                        }}
                        aria-label="Default select example"
                        value={selectedFilteredFlavourSubFlavour}
                      >
                        <option value={""}></option>
                        {filteredFlavourSubFlavours?.map((option) => (
                          <option key={option._id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="" class="flex ">
                      <Button
                        // class="rounded-1  bg-[#1B94A0] text-white"
                        style={{
                          marginTop: 50,
                          backgroundColor: "#1B94A0",
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleConfirmChoice();
                        }}
                        variant="info"
                      >
                        Confirm Choice
                      </Button>
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
