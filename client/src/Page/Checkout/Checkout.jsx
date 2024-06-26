import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";

const Checkout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [subTotal, setSubTotal] = useState();
  const restaurantName = localStorage.getItem("restaurantName");
  const [shippingFee, setShippingFee] = useState();
  const id = localStorage.getItem("id");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("cartData")));

    axios
      .get(process.env.REACT_APP_BASE_URL + `restaurants/${restaurantName}`)
      .then((res) => setShippingFee(res.data.shippingFee));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    calculateSubTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const calculateSubTotal = () => {
    let subtotal = 0;
    if (data) {
      for (const element of data) {
        subtotal += element.price * element.quantity;
      }
    }
    setSubTotal(subtotal);
  };

  const submit = (values) => {
    const itemDetails = [];
    const quantity = [];
    for (const item of data) {
      itemDetails.push(item._id);
      quantity.push(item.quantity);
    }
    const orderData = {
      ...values,
      itemDetails: itemDetails,
      userID: id,
      quantity: quantity,
      status: "ordered",
      subTotal: subTotal,
      total: subTotal + shippingFee,
      restaurantName: restaurantName,
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "orders", orderData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        clearCart();
        navigate("/home");
      })
      .catch((error) => console.log(error.message));
  };

  const clearCart = () => {
    localStorage.removeItem("cartData");
    localStorage.removeItem("restaurantName");
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>Personal Information</h2>
        <form className="mt-4" onSubmit={handleSubmit(submit)}>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.name && errors.name.message}
                </p>
              </div>
            </div>

            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email not in format",
                    },
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.email && errors.email.message}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="number" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  {...register("mobileNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^(0\d{3}[- ]?)?\d{7}$/,
                      message: "Number format is not correct",
                    },
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.mobileNumber && errors.mobileNumber.message}
                </p>
              </div>
            </div>

            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  {...register("city", {
                    required: "City is required",
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.city && errors.city.message}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="mb-3">
                <label htmlFor="adress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.address && errors.address.message}
                </p>
              </div>
            </div>
          </div>
          <h2 className="mt-4">Order Summary</h2>
          <div className="row">
            <div className="col-8">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                    <th scope="col" className="text-end">
                      Total price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, key) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-end">{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="mt-5" />
              <div className="row mt-5 justify-content-between">
                <div className="col-auto">
                  <p>
                    <strong>SubTotal: </strong>
                  </p>
                  <p>
                    <strong>Shipping: </strong>
                  </p>
                  <p>
                    <strong>Total: </strong>
                  </p>
                </div>
                <div className="col-auto text-end">
                  <p>
                    <strong>Rs. {subTotal}</strong>
                  </p>
                  <p>
                    <strong>Rs. {shippingFee}</strong>
                  </p>
                  <p>
                    <strong>Rs. {subTotal + shippingFee}</strong>
                  </p>
                </div>
              </div>
              <div className="row justify-content-end mt-4">
                <div className="col-auto">
                  <button type="submit" className="button-style">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
