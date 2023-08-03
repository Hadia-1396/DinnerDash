import React from "react";
import Header from "../../Components/Header/Header";
import UseFetch from "../../Hooks/UseFetch";
import { useParams } from "react-router-dom";
import standAlone from "../../assets/stand-alone.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [item] = UseFetch(`products/${id}`);
  const role = localStorage.getItem("role");

  const addToCart = () => {
    let isExisted = false;
    if (localStorage.getItem("cartData")) {
      let newArray = JSON.parse(localStorage.getItem("cartData"));
      newArray.forEach((element) => {
        if (element._id === item._id) {
          isExisted = true;
        } else if (element.restaurantName !== item.restaurantName) {
          isExisted = true;
        }
      });
      if (isExisted) {
        return;
      }
      newArray.push({ ...item, quantity: 1 });
      localStorage.setItem("cartData", JSON.stringify(newArray));
    } else {
      localStorage.setItem(
        "cartData",
        JSON.stringify([{ ...item, quantity: 1 }])
      );
      localStorage.setItem("restaurantName", item.restaurantName);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Product Details</h1>
        <div className="row mt-5">
          <div className="card col-6">
            {item?.photoURL ? (
              <img src={item?.photoURL} alt="food" />
            ) : (
              <img src={standAlone} alt="food" />
            )}
          </div>
          <div className="col-5 ms-5">
            <h2>{item?.name}</h2>
            <p className="mt-3">{item?.description}</p>
            <h5 className="mt-5">Price: &emsp;Rs. {item?.price}</h5>
            <h5 className="mt-3">Status: &emsp;{item?.status}</h5>
            <h5 className="mt-3">Restaurant: &emsp;{item?.restaurantName}</h5>
            {role === "customer" && item?.status === "in-stock" && (
              <button className="button-style mt-5" onClick={addToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
