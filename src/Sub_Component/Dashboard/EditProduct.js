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
import { useParams } from "react-router-dom";

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

function VariantOption({ variantOptionsObj, selectedVariant, i, pId }) {
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

  const [optionImg, setOptionImg] = React.useState(variantOptionsObj.optionImg);

  const handleUploadImage = (e) => {
    const id = toast.loading("Uploading Option Image...");
    let formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios
      .post(
        `${apiUrl}/api/v1/product/imageUpload/variant?productId=${pId}`,
        formData
      )
      .then((res) => {
        console.log(res.data);
        console.log("uploaded image");
        // alert("successfully uploaded image!");
        // return 'success';
        toast.update(id, {
          render: "Uploaded Option Image Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setOptionImg(res.data.url);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message ||
            "Option Image Upload Error! See more using console!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

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

        <Form.Group as={Col} xs={2} controlId="">
          {optionImg ? (
            <img
              src={optionImg.replace("/product", "/tr:ar-1-1,h-50/product")}
              loading="lazy"
              alt="option Img"
              id={`${slugify(selectedVariant)}-${i}`}
              data-img={optionImg}
              className="product-image border-2 mt-2"
            />
          ) : (
            <>
              <Form.Label class="font-semibold" style={{ fontSize: "12px" }}>
                Option Img
              </Form.Label>
              <Form.Control
                type="file"
                style={{ height: "35px", width: "70px", fontSize: "10px" }}
                onChange={(e) => handleUploadImage(e)}
              />
              {/* <button
                // onClick={handleUploadImage}
                class="rounded-1 p-0 w-[35px] font-semibold   m-0 bg-[#1B94A0] text-white"
              >
                Confirm Upload
              </button> */}
            </>
          )}
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

function EditProduct() {
  const { prodId, catName, catId } = useParams();

  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFilter = () => setShowFilter(false);

  // custom hooks
  const [fetchedProduct, setFetchedProduct] = React.useState(null);

  React.useEffect(() => {
    const id1 = toast.loading("Fetching Product Details... Please Wait!");
    const id2 = toast.loading("Fetching Filters... Please Wait!");

    axios
      .get(`${apiUrl}/api/v1/product/${prodId}`)
      .then((res) => {
        setFetchedProduct(res.data.data);
        toast.update(id1, {
          render: "Successfully Fetched Product details!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        // setting fetched values
        setProductName(res.data.data.name);
        setDescription(res.data.data.description);
        setBasePrice(res.data.data.basePrice);
        setAvailable(`${res.data.data.available}`);
        setFeatured(`${res.data.data.featured}`);
        setSku(res.data.data.sku);
        setFetchedVariants(res.data.data.variants);
        setFinalVariantsArray(res.data.data.variants);
        const varArray = res.data.data.variants.map((v) => v.variantType);
        setVariantsArray(varArray);
        setFinalFiltersObjArray(res.data.data.chosenFilters);
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
      .get(`${apiUrl}/api/v1/filter?sort=priority&categoryId=${catId}`)
      .then((res) => {
        // console.log(res.data);
        // setFetchedFilters(res.data.data);
        setFilteredFilters(res.data.data);
        toast.update(id2, {
          render: "Successfully Fetched Filters!",
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
  }, []);

  // form states
  const [productName, setProductName] = React.useState("");
  const [available, setAvailable] = React.useState("true");
  const [basePrice, setBasePrice] = React.useState(0);
  const [sku, setSku] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [filteredFilters, setFilteredFilters] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [selectedFilterObj, setSelectedFilterObj] = React.useState(null);
  const [filteredFilterOptions, setFilteredFilterOptions] = React.useState([]);
  const [selectedFilteredFilterOption, setSelectedFilteredFilterOption] =
    React.useState("");
  const [finalFiltersObjArray, setFinalFiltersObjArray] = React.useState([]);
  const [newFilter, setNewFilter] = React.useState(false);

  const [fetchedVariants, setFetchedVariants] = React.useState([]);
  const [variantsArray, setVariantsArray] = React.useState([]);
  const [selectedVariantType, setSelectedVariantType] = React.useState("");
  const [typedNewVariant, setTypedNewVariant] = React.useState("");
  const [finalVariantsArray, setFinalVariantsArray] = React.useState([]);
  const [newVariantSelected, setNewVariantSelected] = React.useState(true);

  const [featured, setFeatured] = React.useState("false");

  const [selectedVariantOptionsArr, setSelectedVariantOptionsArr] =
    React.useState([
      {
        optionValue: "",
        optionPrice: null,
        optionQuantity: null,
        optionSku: "",
        optionImg: "",
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
          if (el.dataset.img) newObj.optionImg = el.dataset.img;
        });
      newArrayOfOptionsObjects.push(newObj);
    });
    console.log(newArrayOfOptionsObjects);

    if (newVariantSelected) {
      setFinalVariantsArray((arr) => [
        ...arr,
        {
          variantType: selectedVariantType,
          options: newArrayOfOptionsObjects,
        },
      ]);
    } else {
      setFinalVariantsArray((arr) => {
        const newArr = arr.map((variant) => {
          if (variant.variantType === selectedVariantType) {
            return {
              variantType: selectedVariantType,
              options: newArrayOfOptionsObjects,
            };
          } else {
            return variant;
          }
        });
        console.log(newArr, "hahah");
        return newArr;
      });
    }
    console.log(finalVariantsArray);
    setSelectedVariantType("");
  };

  const handleSubmitNewProduct = (e) => {
    e.preventDefault();
    // const id = toast.loading("Creating New Product...");

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
      variants: finalVariantsArray,
      chosenFilters: finalFiltersObjArray,
    };
    console.log(payload);

    //   axios
    //     .patch(`${apiUrl}/api/v1/product/${prodId}`, payload)
    //     .then((res) => {
    //       console.log(res.data);
    //       toast.update(id, {
    //         render: "Edited Product Successfully!",
    //         type: "success",
    //         isLoading: false,
    //         autoClose: 3000,
    //       });

    //       // Upload Cover Image
    //       if (uploadingImage) handleUploadImage(res.data.data._id);

    //       // Upload Multiple Images
    //       if (multipleUpload) handleUploadImages(res.data.data._id);

    //       setProductName("");
    //       setDescription("");
    //       setBasePrice(0);
    //       setFinalVariantsArray([]);
    //       setVariantsArray([]);
    //       setSelectedVariantType("");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.update(id, {
    //         render:
    //           err.response?.data?.message ||
    //           "Error Occured! See more using console!",
    //         type: "error",
    //         isLoading: false,
    //         autoClose: 3000,
    //       });
    //     });
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
        handleCloseFilter,
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

  // Multiple Image Upload
  const [optionImages, setOptionImages] = useState([]);

  const handleMultipleOptionFileChange = (e) => {
    setOptionImages((imgs) => [...imgs, e.target.files[0]]);
  };

  const handleUploadOptionImages = (pId) => {
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

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px] z-5">
          <Container class="">
            <h2 class="font-bold text-xl">Edit Product</h2>
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
                        Category Name
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        disabled
                        // onChange={(e) => {
                        //   setSelectedCategory(() => {
                        //     const changedCat = e.target.value;
                        //     const newFilters = fetchedFilters.filter(
                        //       (f) => f.categoryId === changedCat
                        //     );
                        //     const finalFiltersArray = newFilters?.map((f) => {
                        //       return {
                        //         filterId: f._id,
                        //         filterName: f.name,
                        //         chosenOption: "",
                        //       };
                        //     });
                        //     setFilteredFilters(newFilters);
                        //     setFinalFiltersObjArray(finalFiltersArray);
                        //     return changedCat;
                        //   });
                        // }}
                      >
                        <option>{catName}</option>
                        {/* {fetchedCategories?.map((cat) => (
                          <option value={cat._id}>{cat.name}</option>
                        ))} */}
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
                          setVariantsArray((arr) => {
                            console.log([...arr, typedNewVariant]);
                            return [...arr, typedNewVariant];
                          });
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
                        onChange={(e) => {
                          setSelectedVariantType(e.target.value);
                          const [currentVariant] = finalVariantsArray?.filter(
                            (v) => v.variantType === e.target.value
                          );
                          if (currentVariant) {
                            setSelectedVariantOptionsArr(
                              currentVariant.options
                            );
                            setNewVariantSelected(false);
                          } else {
                            setSelectedVariantOptionsArr([
                              {
                                optionValue: "",
                                optionPrice: null,
                                optionQuantity: null,
                                optionSku: "",
                                optionImg: "",
                              },
                            ]);
                            setNewVariantSelected(true);
                          }
                        }}
                        aria-label="Default select example"
                      >
                        <option value={""}>--choose variant--</option>
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

                          if (
                            !fetchedProduct.chosenFilters.some(
                              (f) => f.filterId === fil._id
                            )
                          )
                            setNewFilter(true);
                          else setNewFilter(false);

                          setSelectedFilter(() => {
                            setFilteredFilterOptions(fil.options);
                            setSelectedFilterObj(fil);
                            return e.target.value;
                          });
                        }}
                        aria-label="Default select example"
                        value={selectedFilter}
                      >
                        <option value={""}>--select filters--</option>
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
                        <option value={""}>--select options--</option>
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

                          if (newFilter) {
                            setFinalFiltersObjArray((f) => {
                              return [
                                ...f,
                                {
                                  filterId: selectedFilter,
                                  filterName: selectedFilterObj.name,
                                  chosenOption: selectedFilteredFilterOption,
                                },
                              ];
                            });
                          } else {
                            setFinalFiltersObjArray((f) => {
                              const test = f?.map((finalObj) => {
                                if (finalObj.filterId === selectedFilter)
                                  return {
                                    filterId: selectedFilter,
                                    filterName: selectedFilterObj.name,
                                    chosenOption: selectedFilteredFilterOption,
                                  };
                                else return finalObj;
                              });
                              return test;
                            });
                          }

                          setSelectedFilter("");
                          setSelectedFilteredFilterOption("");
                          setSelectedFilterObj(null);
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
                              pId={prodId}
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
                                optionPrice: null,
                                optionQuantity: null,
                                optionSku: "",
                                optionImg: "",
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

export default EditProduct;
