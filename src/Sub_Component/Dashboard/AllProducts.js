import { useState } from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./allproduct.css";
import DashboardNavbar from "./DashboardNavbar";

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("disposable");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <DashboardNavbar />
      <div class=" mt-24 absolute lg:left-[250px]">
        <h2 class="text-xl font-bold mb-5 text-center">All Product</h2>
        <span class="flex justify-center items-center  ">
          {" "}
          <div
            class="bg-[#f5f5f5] rounded-l-full  w-[115px] h-[60px] flex justify-center items-center"
            style={{ boxShadow: "1px 3px 3px 0px #dee2e6" }}
          >
            <input
              type="radio"
              id="eliquids"
              name="category"
              value="eliquids"
              checked={selectedCategory === "eliquids"}
              onChange={() => handleCategoryChange("eliquids")}
            />
            <label
              htmlFor="eliquids"
              class="text-[#555555] text-[18px] font-semibold"
            >
              Eliquids
            </label>
          </div>
          <div
            class="bg-[#f5f5f5]  w-[134px] h-[60px] flex justify-center items-center"
            style={{ boxShadow: " 2px 3px 3px 0px #dee2e6" }}
          >
            <input
              type="radio"
              id="disposable"
              name="category"
              value="disposable"
              checked={selectedCategory === "disposable"}
              onChange={() => handleCategoryChange("disposable")}
            />
            <label
              htmlFor="disposable"
              class="text-[#555555] text-[18px] font-semibold"
            >
              Disposable
            </label>
          </div>
          <div
            class="bg-[#f5f5f5]  rounded-r-full w-[150px] h-[60px] flex justify-center items-center"
            style={{ boxShadow: "2px 3px 3px 0px #dee2e6" }}
          >
            <input
              type="radio"
              id="refill&pods"
              name="category"
              value="refill&pods"
              checked={selectedCategory === "refill&pods"}
              onChange={() => handleCategoryChange("refill&pods")}
            />
            <label
              htmlFor="refill&pods"
              class="text-[#555555] text-[18px] font-semibold"
            >
              Refill & Pods
            </label>
          </div>

       
        </span>

        <div>
          {selectedCategory === "eliquids" && (
            <Container fluid className="my-5">
              <Row>
                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/2nuimwatr/Aroma%20King%20Gem%20600%20Disposable%C2%A0Vape@2x.png?updatedAt=1705572053563"
                      alt=""
                      //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}

          {selectedCategory === "disposable" && (
            <Container fluid className="my-5">
              <Row>
                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/IVG%202400%20Disposable%20Vape.webp?updatedAt=1705781578740"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}

          {selectedCategory === "refill&pods" && (
            <Container fluid className="my-5">
              <Row>
                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div id="content" class="m-2 relative">
                    <img
                      src="https://ik.imagekit.io/p2slevyg1/mod1.png_updatedAt=1705572053508?updatedAt=1705781995597"
                      alt=""
                    />
                    <div className="d-flex flex-row gap-5">
                      {" "}
                      <div>
                        <p class="text-black font-semibold text-[12px]">
                          IVG 2400 Disposable Vape
                        </p>
                      </div>
                      <p class="text-[#000000] font-semibold  text-[12px]">
                        £7.95
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;