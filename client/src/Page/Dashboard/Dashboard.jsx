import React from "react";
import Header from "../../Components/Header/Header";
import UseFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Dashboard = () => {
  const id = localStorage.getItem("id");
  const [items] = UseFetch(`getdashboardorder/${id}`);
  let count = 1;
  console.log(items);
  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Orders</h1>
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
                    <Link to={{ pathname: `/browse/${item.restaurantName}` }}>
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
                      <Link className="me-2">Cancel</Link>
                      <Link className="ms-2 me-2">Mark as Paid</Link>
                    </>
                  ) : (
                    <>
                      <Link className="me-2">Cancel</Link>
                      <Link className="ms-2 me-2">Mark as Completed</Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
