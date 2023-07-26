import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("cartData")));
  }, []);

  const incrementQuanity = (id, _quantity) => {
    const newData = data.map((item, key) => {
      if (item._id === id) {
        return { ...item, quantity: _quantity + 1 };
      } else {
        return item;
      }
    });

    localStorage.setItem("cartData", JSON.stringify(newData));
    setData(newData);
  };

  const decrementQuantity = (id, _quantity) => {
    if (_quantity > 1) {
      _quantity--;
    }
    const newData = data.map((item, key) => {
      if (item._id === id) {
        return { ...item, quantity: _quantity };
      } else {
        return item;
      }
    });
    localStorage.setItem("cartData", JSON.stringify(newData));
    setData(newData);
  };

  const deleteItem = (id) => {
    const newData = data.filter((item) => item._id !== id);

    localStorage.setItem("cartData", JSON.stringify(newData));
    if (newData.length) {
      setData(newData);
    } else {
      setData();
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cartData");
    localStorage.removeItem("restaurantName");
    setData();
  };

  const handleCheckout = () => {
    if (localStorage.getItem("token")) {
      navigate("/checkout");
    } else {
      navigate("/errorpage");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h1 className="text-center mt-5">Items in Cart</h1>
            {data?.map((item) => (
              <div className="card mt-5 pt-4 pb-4 ps-4 pe-4">
                <div className="row">
                  <div className="col-2">
                    <img src={item.photoURL} width="100%" height="100%" />
                  </div>
                  <div className="col-8">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="col-2 text-end">
                    <p>Rs. {item.price}</p>
                    <RemoveCircleIcon
                      className="me-1"
                      onClick={() => decrementQuantity(item._id, item.quantity)}
                    />
                    {item.quantity}
                    <AddCircleIcon
                      className="ms-1"
                      onClick={() => incrementQuanity(item._id, item.quantity)}
                    />
                    <br />
                    <DeleteIcon onClick={() => deleteItem(item._id)} />
                  </div>
                </div>
              </div>
            ))}
            {data && (
              <div className="row mt-5 justify-content-end">
                <div className="col-auto">
                  <button className="button-style" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
                <div className="col-auto">
                  <button className="button-style" onClick={clearCart}>
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
