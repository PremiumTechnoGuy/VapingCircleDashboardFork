import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import "./orders.css";
import OrderRow from "./OrderRow";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { ToastContainer, toast } from "react-toastify";

function Orders() {
  const [allOrders, setAllOrders] = React.useState([]);

  React.useEffect(() => {
    const id = toast.loading("Fetching Data...");

    axios
      .get(`${apiUrl}/api/v1/order?sort=-createdAt`)
      .then((res) => {
        setAllOrders(res.data.data);
        toast.update(id, {
          render: "Fetched Successfully!",
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
  }, []);

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px]">
          <h2 class="font-bold text-xl">Order History</h2>
          <div className="table-responsive mt-5 ">
            <table className="table table-hover text-nowrap">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th className="border-top-0 pt-0 pb-2"></th>
                  <th className="border-top-0 pt-0 pb-2">Order#</th>
                  <th className="border-top-0 pt-0 pb-2">Date&Time</th>
                  <th className="border-top-0 pt-0 pb-2">Product</th>
                  <th className="border-top-0 pt-0 pb-2">Status</th>
                  <th className="border-top-0 pt-0 pb-2">Customer</th>
                  {/* <th className="border-top-0 pt-0 pb-2">Payment Method</th> */}
                  {/* <th className="border-top-0 pt-0 pb-2">Sales Type</th> */}
                  <th className="border-top-0 pt-0 pb-2">Total Amount</th>
                  {/* <th className="border-top-0 pt-0 pb-2">Vat</th> */}
                  <th className="border-top-0 pt-0 pb-2">Delivery Info</th>
                  {/* <th className="border-top-0 pt-0 pb-2">Paid</th> */}
                  {/* <th className="border-top-0 pt-0 pb-2">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {allOrders?.map((ord) => (
                  <OrderRow key={ord._id} order={ord} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Orders;
