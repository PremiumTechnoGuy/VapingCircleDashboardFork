import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-router-dom";

function OrderRow({ order }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isEditing, setIsEditing] = useState(false);
  const [totalPrice, setTotalPrice] = useState("£34.99"); // Initial total price

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset totalPrice to its initial value when canceling edit
    setTotalPrice("£34.99");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTotalPrice(value);
  };

  return (
    <>
      <tr style={{ textAlign: "center" }}>
        {/* Render other fields as plain text or links */}
        <td className="w-10px align-middle">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="product1" />
            <label className="form-check-label"></label>
          </div>
        </td>
        <td className="align-middle">
          <a href>{order._id.substr(order._id.length - 9)}</a>
        </td>
        <td className="align-middle">
          {new Date(order.createdAt).toLocaleString("en-GB")}
        </td>
        <td className="align-middle">
          {order.commodities.map((comm) => {
            return (
              <>
                {`Qty.${comm.quantity} => ${comm.nm} ${
                  comm.variants.length !== 0 ? "=>" : ""
                } ${comm.variants?.map(
                  (vr) => `[${vr.variantType} - ${vr.chosenOption.optionValue}]`
                )},`}
                <br></br>
              </>
            );
          })}
        </td>
        <td className="align-middle">{order.status}</td>
        <td className="py-1 align-middle">
          <span className="cursor-pointer text-underline">
            {order.customerId?.firstName || ""}
          </span>
        </td>
        {/* <td className="align-middle">
          <span>Card</span>
        </td> */}
        {/* <td className="align-middle">Just Taste</td> */}
        <td className="align-middle">
          £
          {order.commodities
            .map((c) => c.totalPrice || c.price * c.quantity)
            .reduce((p, c) => p + c, 0)
            .toFixed(2)}
        </td>
        {/* <td className="align-middle">£34.99</td> */}
        <td className="align-middle">{`${order.delivery?.deliveryType} - ${order.delivery?.deliveryTime} - £${order.delivery?.deliveryPrice}`}</td>
        {/* Render totalPrice field as input when editing, otherwise as plain text */}
        {/* <td className="align-middle">
          {isEditing ? (
            <input
              type="text"
              value={totalPrice}
              onChange={handleInputChange}
            />
          ) : (
            <span>{totalPrice}</span>
          )}
        </td>
        <td className="align-middle">
          {isEditing ? (
            <button
              className="btn bg-[#1B94A0] text-[12px] text-white"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          ) : (
            <>
              <button
                className="btn bg-[#1B94A0] text-[12px] text-white"
                onClick={handleEditClick}
              >
                Edit
              </button>{" "}
              <button className="btn bg-[#1B94A0] text-[12px] text-white">
                Delete
              </button>
            </>
          )}
        </td> */}
      </tr>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form.Group className="mb-3 flex justify-center items-center">
            <Form.Label class="font-semibold">Variant Type:</Form.Label>
            <Form.Control
              placeholder=""
              // value={selectedVariantType}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              e.preventDefault();
              // handleCloseVariantModal();
              // handleClose();
            }}
            variant="info"
            class="rounded-1 py-2 px-2 bg-[#1B94A0] text-white hover:bg-[#1B94A0] hover:text-white"
          >
            Confirm Options & Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default OrderRow;
