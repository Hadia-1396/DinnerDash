import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import standAlone from "../../assets/stand-alone.jpg";

const Item = ({ item, product, fetchData }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

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
      .delete(process.env.REACT_APP_BASE_URL + `products/${id}`, {
        headers: headers,
      })
      .then((res) => fetchData())
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      {product === "products" ? (
        <>
          <div className="card">
            {item.photoURL ? (
              <img
                src={item.photoURL}
                alt="food"
                className="card-img-top"
                onClick={() => navigate(`/productdetails/${item._id}`)}
              />
            ) : (
              <img
                src={standAlone}
                alt="food"
                className="card-img-top"
                onClick={() => navigate(`/productdetails/${item._id}`)}
              />
            )}
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
      ) : product === "restaurant" ? (
        <>
          <div
            className="card"
            onClick={() => navigate(`/browse/${item.name}`)}
          >
            <img src={item.photoURL} alt="food" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            {item.photoURL ? (
              <img
                src={item.photoURL}
                alt="food"
                className="card-img-top"
                onClick={() => navigate(`/productdetails/${item._id}`)}
              />
            ) : (
              <img
                src={standAlone}
                alt="food"
                className="card-img-top"
                onClick={() => navigate(`/productdetails/${item._id}`)}
              />
            )}
            <div className="card-body mt-2">
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
            <div className="row justify-content-end mb-4 mt-3">
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
