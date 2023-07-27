import React from "react";
import Header from "../../Components/Header/Header";
import UseFetch from "../../Hooks/UseFetch";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [item] = UseFetch(`getproduct/${id}`);
  const role = localStorage.getItem("role");

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Product Details</h1>
        <div className="row mt-5">
          <div className="card col-6">
            <img src={item?.photoURL} />
          </div>
          <div className="col-5 ms-5">
            <h2>{item?.name}</h2>
            <p className="mt-3">{item?.description}</p>
            <h5 className="mt-5">Price: &emsp;Rs. {item?.price}</h5>
            <h5 className="mt-3">Status: &emsp;{item?.status}</h5>
            <h5 className="mt-3">Restaurant: &emsp;{item?.restaurantName}</h5>
            {role === "customer" && (
              <button className="button-style mt-5">Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
