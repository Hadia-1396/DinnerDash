import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Item = ({ item, product }) => {
  const navigate = useNavigate();

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
    }
  };

  return (
    <div>
      {product ? (
        <>
          <div className="card">
            <img src={item.photoURL} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <div className="row justify-content-between">
                <div className="col-auto">
                  <p className="card-text">Rs. {item.price}</p>
                </div>
                <div className="col-auto">
                  <ShoppingCartIcon onClick={addToCart} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="card"
            onClick={() => navigate(`/browse/${item.name}`)}
          >
            <img src={item.photoURL} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
