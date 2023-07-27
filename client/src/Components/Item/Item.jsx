import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

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
      localStorage.setItem("restaurantName", item.restaurantName);
    }
  };

  const deleteProduct = (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `deleteitem/${id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      {product == "products" ? (
        <>
          <div
            className="card"
            onClick={() => navigate(`/productdetails/${item._id}`)}
          >
            <img src={item.photoURL} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <div className="row justify-content-between">
                <div className="col-auto">
                  <p className="card-text">Rs. {item.price}</p>
                </div>
                <div className="col-auto">
                  {item.status === "in-stock" && (
                    <ShoppingCartIcon onClick={addToCart} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : product == "restaurant" ? (
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
      ) : (
        <>
          <div className="card">
            <img src={item.photoURL} className="card-img-top" />
            <div className="card-body">
              <div className="row justify-content-between">
                <div className="col-auto">
                  <p className="card-text">Rs. {item.price}</p>
                </div>
                <div className="col-auto">
                  <h5 className="card-title">{item.name}</h5>
                </div>
              </div>
              <p className="card-text">{item.description}</p>
            </div>
            <div className="row justify-content-end mb-2">
              <div className="col-auto">
                <button
                  className="button-style ms-2"
                  onClick={() => {
                    navigate(`/managecategory/${item._id}`);
                  }}
                >
                  Edit Category
                </button>
                <button
                  className="button-style ms-2"
                  onClick={() => {
                    navigate(`/addproduct/${item._id}`, {
                      state: {
                        isEdit: true,
                      },
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="button-style ms-2 me-2"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
