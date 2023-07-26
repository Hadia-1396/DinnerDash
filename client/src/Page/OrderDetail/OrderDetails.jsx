import React from "react";
import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";

const OrderDetails = () => {
  const { id } = useParams();
  const [item] = UseFetch(`getorderbyid/${id}`);
  console.log(item);
  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Order Details</h1>
      </div>
    </>
  );
};

export default OrderDetails;
