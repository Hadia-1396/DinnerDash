import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import UseFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const OrderHistory = () => {
  const id = localStorage.getItem("id");
  const [items] = UseFetch(`getorder/${id}`);

  console.log(items);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Your Past Orders</h1>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Items</th>
              <th scope="col">Quantity</th>
              <th scope="col">Restaurant</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Total</th>
              <th scope="col">Date/Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {items?.map((item, key) => (
              <tr key={item._id}>
                <th scope="row">1</th>
                <td>
                  {item.itemDetails?.map((itemDetail) => (
                    <Link to={{ pathname: `/browse/${item.restaurantName}` }}>
                      <p>{itemDetail.name}</p>
                    </Link>
                  ))}
                </td>
                <td>
                  {item.quantity?.map((quan) => (
                    <p>{quan}</p>
                  ))}
                </td>
                <td>{item.restaurantName}</td>
                <td>{item.subTotal}</td>
                <td>{item.total}</td>
                <td>
                  {format(new Date(item.createdAt), "yyyy-MM-dd/kk:mm:ss")}
                </td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistory;
