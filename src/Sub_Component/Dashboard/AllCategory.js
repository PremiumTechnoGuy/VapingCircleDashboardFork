import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";

function AllCategory() {
  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px]">
          <h2 class="text-xl font-bold mb-5 text-center">All Categories</h2>
          <Container fluid className="my-5">
            <Row>
              <Col>
                <div id="content" class="m-2 relative">
                  <img
                    src="https://ik.imagekit.io/p2slevyg1/eliwuid.6afb005513632e5eee16.png?updatedAt=1705783853576"
                    alt=""
                   
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black font-semibold my-2 text-center text-[15px]">
                        Eliquids
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div id="content" class="m-2 relative">
                  <img
                    src="https://ik.imagekit.io/p2slevyg1/banner%20(1).b583de9d0b8863110860.png?updatedAt=1705783929329"
                   
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black font-semibold my-2 text-[15px] text-center">
                        Disposable
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div id="content" class="m-2 relative">
                  <img
                    src="https://ik.imagekit.io/p2slevyg1/download%20(10).22ab40bc20f4bd8ee718.png?updatedAt=1705783990590"
                    alt=""
                    //   class=" w-[45rem] xs:h-[13rem] md:h-[21rem] transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-150"
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black font-semibold my-2 text-center text-[15px]">
                        Vape KIts
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div id="content" class="m-2 relative">
                  <img
                    src="https://ik.imagekit.io/p2slevyg1/refill.3631608703927414c2f9.png?updatedAt=1705784379729"
          
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black text-center my-2 font-semibold text-[15px]">
                        Refill & Pods
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div id="content" class="m-2 relative">
                  <img
                    src="https://ik.imagekit.io/p2slevyg1/pexels-zain-ali-17962166.539b57a8bde29fa2f85f.png?updatedAt=1705784447574"
                   
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black text-center my-2 font-semibold text-[15px]">
                        Mods
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div id="content" class="m-2 relative">
                  <img
                    src="https://ik.imagekit.io/p2slevyg1/images%20(4).61c1110b7679b09064d3.png?updatedAt=1705784467158"
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black text-center my-2 font-semibold text-[15px]">
                        Tanks
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div id="content" class="m-2 relative">
                  <img
                   src="https://ik.imagekit.io/p2slevyg1/how-to-prime-a-coil-ultimate-guide-on-priming-a-vape-coil.0eb61d203a582afa8462.png?updatedAt=1705784535832"
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black font-semibold my-2 text-center text-[15px]">
                        Coil
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div id="content" class="m-2 relative">
                  <img
                   src="https://ik.imagekit.io/p2slevyg1/potv-xmax-v3-pro-black-optimum-bundle_1_576x@2x.db36c94fc550ffb51a43.png?updatedAt=1705784636903"
                  />
                  <div className="">
                    {" "}
                    <div>
                      <p class="text-black font-semibold my-2 text-center text-[15px]">
                        Accessories
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="md:block hidden">
            <Col md={3}>
                <div >
                  <img
                  src="https://ik.imagekit.io/p2slevyg1/pod-system-1.d5bee5d451c2fb3fb0c5.png?updatedAt=1705784663074"
                   />
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
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AllCategory;