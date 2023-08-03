import React from "react";
import Header from "../../Components/Header/Header";
import UseFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const OrderHistory = () => {
  const id = localStorage.getItem("id");
  const [items] = UseFetch(`orders/${id}`);
  let count = 1;

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Your Past Orders</h1>
        <table className="table table-striped mt-5">
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
            {items?.map((item) => (
              <tr key={item._id}>
                <th scope="row">{count++}</th>
                <td>
                  {item.itemDetails?.map((itemDetail, index) => (
                    <Link
                      key={index}
                      to={{ pathname: `/productdetails/${itemDetail._id}` }}
                    >
                      <p>{itemDetail.name}</p>
                    </Link>
                  ))}
                </td>
                <td>
                  {item.quantity?.map((quan, index) => (
                    <p key={index}>{quan}</p>
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
