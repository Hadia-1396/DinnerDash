import React from "react";
import Header from "../../Components/Header/Header";
import { useParams, Link } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";
import { format } from "date-fns";

const OrderDetails = () => {
  const { id } = useParams();
  let count = 1;
  const [item] = UseFetch(`getorderbyid/${id}`);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Order Details</h1>
        <table className="table">
          <tbody className="mt-5">
            <tr>
              <th>Customer Name</th>
              <td>{item?.name}</td>
            </tr>
            <tr>
              <th>Customer Email</th>
              <td>{item?.email}</td>
            </tr>
            <tr>
              <th>Order Date</th>
              {item && (
                <td>{format(new Date(item?.createdAt), "yyyy-MM-dd")}</td>
              )}
            </tr>
            <tr>
              <th>Order Time</th>
              {item && <td>{format(new Date(item?.createdAt), "kk:mm:ss")}</td>}
            </tr>
            <tr>
              {item && (
                <>
                  {(item.status === "completed" ||
                    item.status === "cancelled") && (
                    <>
                      <th>Order {item.status} Date</th>
                      <td>{format(new Date(item?.updatedAt), "yyyy-MM-dd")}</td>
                    </>
                  )}
                </>
              )}
            </tr>
            <tr>
              {item && (
                <>
                  {(item.status === "completed" ||
                    item.status === "cancelled") && (
                    <>
                      <th>Order {item.status} Time</th>
                      <td>{format(new Date(item?.updatedAt), "kk:mm:ss")}</td>
                    </>
                  )}
                </>
              )}
            </tr>
            <tr>
              <th>Total Price</th>
              <td>{item?.total}</td>
            </tr>
            <tr>
              <th>Order Status</th>
              <td>{item?.status}</td>
            </tr>
          </tbody>
        </table>

        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Items</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {item?.itemDetails?.map((itemDetail, index) => (
              <tr>
                <th scope="row">{count++}</th>
                <td>
                  <Link to={{ pathname: `/browse/${item.restaurantName}` }}>
                    <p>{itemDetail.name}</p>
                  </Link>
                </td>
                <td>
                  <p>{item.quantity[index]}</p>
                </td>
                <td>{itemDetail.price}</td>
                <td>{itemDetail.price * item.quantity[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;
