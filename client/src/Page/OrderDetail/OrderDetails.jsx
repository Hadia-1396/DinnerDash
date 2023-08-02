import React from "react";
import Header from "../../Components/Header/Header";
import { useParams, Link } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";
import { format } from "date-fns";

const OrderDetails = () => {
  const { id } = useParams();
  let count = 1;
  const [item] = UseFetch(`orders/getbyid/${id}`);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center mb-5">Order Details</h1>
        <div className="row">
          <div className="col-8 offset-2">
            <table className="table table-borderless align-middle">
              <tbody className="mt-5">
                <tr>
                  <th className="pt-2">Customer Name</th>
                  <td className="pt-2">{item?.name}</td>
                </tr>
                <tr>
                  <th className="pt-2">Customer Email</th>
                  <td className="pt-2">{item?.email}</td>
                </tr>
                <tr>
                  <th className="pt-2">Order Date</th>
                  {item && (
                    <td className="pt-2">
                      {format(new Date(item?.createdAt), "yyyy-MM-dd")}
                    </td>
                  )}
                </tr>
                <tr>
                  <th className="pt-2">Order Time</th>
                  {item && (
                    <td className="pt-2">
                      {format(new Date(item?.createdAt), "kk:mm:ss")}
                    </td>
                  )}
                </tr>
                <tr>
                  {item && (
                    <>
                      {(item.status === "completed" ||
                        item.status === "cancelled") && (
                        <>
                          <th className="pt-2">Order {item.status} Date</th>
                          <td className="pt-2">
                            {format(new Date(item?.updatedAt), "yyyy-MM-dd")}
                          </td>
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
                          <th className="pt-2">Order {item.status} Time</th>
                          <td className="pt-2">
                            {format(new Date(item?.updatedAt), "kk:mm:ss")}
                          </td>
                        </>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <th className="pt-2">Total Price</th>
                  <td className="pt-2">{item?.total}</td>
                </tr>
                <tr>
                  <th className="pt-2">Order Status</th>
                  <td className="pt-2">{item?.status}</td>
                </tr>
              </tbody>
            </table>

            <table className="table align-middle table-striped mt-5">
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
                {item?.itemDetails?.map((itemDetail, index, key) => (
                  <tr key={index}>
                    <th scope="row">{count++}</th>
                    <td>
                      <Link
                        to={{
                          pathname: `/productdetails/${itemDetail._id}`,
                        }}
                      >
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
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
