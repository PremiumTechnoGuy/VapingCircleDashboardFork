import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavbarBrand } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosSearch } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { IoGridSharp } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function DashboardNavbar() {
  return (
    <div>
      <div class="relative">
        {[false].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            className="bg-body-tertiary w-[-webkit-fill-available] p-2 fixed shadow-md z-[100] bg-white"
          >
            <Container fluid>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />

              <NavbarBrand className="hidden md:block">
                <InputGroup className="w-96  ">
                  <Form.Control
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ height: 35 }}
                  />
                  <InputGroup.Text
                    id="basic-addon1"
                    className="text-white"
                    style={{ height: 36, backgroundColor: "#1B94A0" }}
                  >
                    <IoIosSearch className="text-2xl" />
                  </InputGroup.Text>
                </InputGroup>
              </NavbarBrand>

              <NavbarBrand className="block md:hidden">
                <img
                  width="60px"
                  src="https://ik.imagekit.io/p2slevyg1/WhatsApp%20Image%202024-01-01%20at%2012.04.01%20AM.jpeg?updatedAt=1704049949841"
                />
              </NavbarBrand>

              <Navbar.Brand
                href="#"
                className="d-flex flex-row "
                style={{ borderRadius: "0px 24px 24px 0px" }}
              >
                <span>
                  <img
                    height="25px"
                    width="24px"
                    // style={{ marginTop: 5 }}
                    src="https://ik.imagekit.io/p2slevyg1/bell%20icon.png?updatedAt=1705346486945"
                    alt="bell"
                  />
                </span>
                <span>
                  <img
                    height="30px"
                    width="32px"
                    //   class="py-3"
                    src="https://ik.imagekit.io/p2slevyg1/profile%20(1).png?updatedAt=1704099476479"
                  />
                </span>
              </Navbar.Brand>

              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/dashboard" class="mb-3 text-xl">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link
                      href="/dashboard/addCategory"
                      class="mb-3 text-xl "
                    >
                      Create Category
                    </Nav.Link>
                    <Nav.Link
                      href="/dashboard/all_category"
                      class="mb-3 text-xl "
                    >
                      Categories
                    </Nav.Link>
                    <Nav.Link href="/dashboard/addFilter" class="mb-3 text-xl">
                      Create Filters
                    </Nav.Link>
                    <Nav.Link href="/dashboard/addProduct" class="mb-3 text-xl">
                      Create Products
                    </Nav.Link>
                    <Nav.Link
                      href="/dashboard/all_product"
                      class="mb-3 text-xl"
                    >
                      Products
                    </Nav.Link>
                    <Nav.Link href="/dashboard/orders" class="mb-3 text-xl">
                      Orders
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>

      <div
        class="w-48 bg-[#1B94A0] rounded-r-lg absolute p-5 md:block hidden fixed h-screen"
        style={{ zIndex: 1000, position: "fixed" }}
      >
        <Link to="/">
          {" "}
          <img
            width="70px"
            class="text-center"
            style={{ marginTop: -27 }}
            alt=""
            src="https://ik.imagekit.io/p2slevyg1/WhatsApp_Image_2024-01-01_at_12.04.01_AM-removebg-preview.png?updatedAt=1705349785437"
          />
        </Link>
        <div className="d-flex flex-row  w-48 mt-3 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0] "
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </p>
        </div>

        <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/addCategory"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Create Category</span>
            </NavLink>
          </p>
        </div>
        <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/all_category"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Categories</span>
            </NavLink>
          </p>
        </div>

        <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/addFilter"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Create Filter</span>
            </NavLink>
          </p>
        </div>

        <div className="d-flex flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/addProduct"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Create Products</span>
            </NavLink>
          </p>
        </div>
        <div className="d-flex flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/all_product"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Products</span>
            </NavLink>
          </p>
        </div>

        <div className="d-flex flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#1B94A0]"
            style={{ marginLeft: -48 }}
          >
            <a
              href="/dashboard/orders"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Orders</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
