import axios from "axios";
import React from "react";
import { apiUrl } from "../../data/env";
import { toast } from "react-toastify";

function OrderRow({ order }) {
  const [status, setStatus] = React.useState(order.status); // Initial status

  const statusOptions = [
    "pending",
    "cancelled",
    "paid",
    "processing",
    "dispatching",
    "delivered",
  ];
  const handleStatusChange = (e) => {
    const id = toast.loading("Changing Status...");
    const { value } = e.target;
    setStatus(value);
    axios
      .patch(`${apiUrl}/api/v1/order/${order._id}`, { status: value })
      .then((res) => {
        console.log(res.data);
        toast.update(id, {
          render: "Status changed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render: err.response?.data?.message || "Unsuccessful!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
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
        <td className="align-middle">
          <select value={status} onChange={handleStatusChange}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
        <td className="py-1 align-middle">
          <span
            className="cursor-pointer underline"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            See Customer Info
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
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-black" id="exampleModalLabel">
                Customer Info
              </h5>
              <button
                type="button"
                className="btn-close text-black"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <p>
                Name: {order.customerId?.firstName} {order.customerId?.lastName}
              </p>
              <p>Email: {order.customerId?.email}</p>
              <p>Phone: {order.customerId?.phone}</p>
              <p>Address: {order.customerId?.address}</p>
              <p>
                Postcode: {order.customerId?.postcode} -{" "}
                {order.customerId?.distanceFromOrigin} from centre
              </p>
              <p>City: {order.customerId?.city}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-black"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderRow;
