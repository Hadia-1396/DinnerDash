import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import UseFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const id = localStorage.getItem("id");
  const [items] = UseFetch(`getdashboardorder/${id}`);
  const [statusItems, setStatusItems] = useState();
  let count = 1;

  const changeStatus = (newStatus, _id) => {
    axios
      .patch(process.env.REACT_APP_BASE_URL + `updatestatus/${_id}`, {
        newStatus: newStatus,
      })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleStatusChange = (e) => {
    const arr = items?.filter((item) => {
      if (item.status === e.target.value) {
        return item;
      }
    });
    setStatusItems(arr);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Orders</h1>
        <div className="row justify-content-end">
          <div className="col-auto">
            <select
              value=""
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleStatusChange(e)}
            >
              <option selected value="">
                Select Status
              </option>
              <option value="ordered">Ordered</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {statusItems ? (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Items</th>
                <th scope="col">Status</th>
                <th scope="col">View Order</th>
                <th scope="col">Status Transition</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {statusItems?.map((item, key) => (
                <tr key={item._id}>
                  <th scope="row">{count++}</th>
                  <td>
                    {item.itemDetails?.map((itemDetail) => (
                      <Link
                        to={{ pathname: `/productdetails/${itemDetail._id}` }}
                      >
                        <p>{itemDetail.name}</p>
                      </Link>
                    ))}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={{ pathname: `/orderdetails/${item._id}` }}>
                      View details
                    </Link>
                  </td>
                  <td>
                    {item.status === "ordered" ? (
                      <>
                        <Link
                          className="me-2"
                          onClick={() => changeStatus("cancelled", item._id)}
                        >
                          Cancel
                        </Link>
                        <Link
                          className="ms-2 me-2"
                          onClick={() => changeStatus("paid", item._id)}
                        >
                          Mark as Paid
                        </Link>
                      </>
                    ) : item.status === "paid" ? (
                      <>
                        <Link
                          className="me-2"
                          onClick={() => changeStatus("cancelled", item._id)}
                        >
                          Cancel
                        </Link>
                        <Link
                          className="ms-2 me-2"
                          onClick={() => changeStatus("completed", item._id)}
                        >
                          Mark as Completed
                        </Link>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Items</th>
                <th scope="col">Status</th>
                <th scope="col">View Order</th>
                <th scope="col">Status Transition</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {items?.map((item, key) => (
                <tr key={item._id}>
                  <th scope="row">{count++}</th>
                  <td>
                    {item.itemDetails?.map((itemDetail) => (
                      <Link
                        to={{ pathname: `/productdetails/${itemDetail._id}` }}
                      >
                        <p>{itemDetail.name}</p>
                      </Link>
                    ))}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={{ pathname: `/orderdetails/${item._id}` }}>
                      View details
                    </Link>
                  </td>
                  <td>
                    {item.status === "ordered" ? (
                      <>
                        <Link
                          className="me-2"
                          onClick={() => changeStatus("cancelled", item._id)}
                        >
                          Cancel
                        </Link>
                        <Link
                          className="ms-2 me-2"
                          onClick={() => changeStatus("paid", item._id)}
                        >
                          Mark as Paid
                        </Link>
                      </>
                    ) : item.status === "paid" ? (
                      <>
                        <Link
                          className="me-2"
                          onClick={() => changeStatus("cancelled", item._id)}
                        >
                          Cancel
                        </Link>
                        <Link
                          className="ms-2 me-2"
                          onClick={() => changeStatus("completed", item._id)}
                        >
                          Mark as Completed
                        </Link>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Dashboard;
