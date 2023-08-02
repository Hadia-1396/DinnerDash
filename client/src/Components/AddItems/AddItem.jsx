import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import "./style.css";

const AddItem = ({ products, isEdit, id }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [image, setImage] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState();

  const userID = localStorage.getItem("id");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const restaurantInitialValue = {
    name: "",
    shippingFee: "",
  };

  const productInitialValue = {
    category: "",
    restaurantName: "",
    status: "",
    name: "",
    description: "",
    price: "",
  };

  useEffect(() => {
    if (isEdit) {
      axios
        .get(process.env.REACT_APP_BASE_URL + `getproduct/${id}`)
        .then((response) => {
          setValue("restaurantName", response.data.restaurantName);
          setValue("status", response.data.status);
          setValue("name", response.data.name);
          setValue("description", response.data.description);
          setValue("price", response.data.price);
        });
    }
    axios
      .get(process.env.REACT_APP_BASE_URL + "getlist")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restaurantList() {
    let items = [];
    for (const restaurant of restaurants) {
      items.push(
        <option key={restaurant._id} value={restaurant.name}>
          {restaurant.name}
        </option>
      );
    }
    return items;
  }

  const onSubmit = (values) => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Products");
      data.append("cloud_name", "dpidz8n5y");
      fetch("https://api.cloudinary.com/v1_1/dpidz8n5y/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (isEdit) {
            axios
              .patch(
                process.env.REACT_APP_BASE_URL + `updateitem/${id}`,
                {
                  ...values,
                  photoURL: data.url,
                  userID: userID,
                },
                {
                  headers: headers,
                }
              )
              .then((response) => {
                console.log(response);
                reset(productInitialValue);
              })
              .catch((error) => {
                if (error.response.status === 400) {
                  setError(error.response.data.message);
                } else {
                  setError("");
                }
              });
          } else {
            axios
              .post(
                process.env.REACT_APP_BASE_URL + "additem",
                {
                  ...values,
                  photoURL: data.url,
                  userID: userID,
                },
                {
                  headers: headers,
                }
              )
              .then((response) => {
                console.log(response);
                reset(productInitialValue);
              })
              .catch((error) => {
                if (error.response.status === 400) {
                  setError(error.response.data.message);
                } else {
                  setError("");
                }
              });
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (isEdit) {
        axios
          .patch(
            process.env.REACT_APP_BASE_URL + `updateitem/${id}`,
            {
              ...values,
              userID: userID,
            },
            {
              headers: headers,
            }
          )
          .then((response) => {
            console.log(response);
            reset(productInitialValue);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              setError(error.response.data.message);
            } else {
              setError("");
            }
          });
      } else {
        axios
          .post(
            process.env.REACT_APP_BASE_URL + "additem",
            {
              ...values,
              userID: userID,
            },
            { headers: headers }
          )
          .then((response) => {
            console.log(response);
            reset(productInitialValue);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              setError(error.response.data.message);
            } else {
              setError("");
            }
          });
      }
    }
  };

  const onRestaurantSubmit = (values) => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Products");
      data.append("cloud_name", "dpidz8n5y");
      fetch("https://api.cloudinary.com/v1_1/dpidz8n5y/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          values = Object.assign({ photoURL: data.url }, values);
          axios
            .post(process.env.REACT_APP_BASE_URL + "addrestaurant", values, {
              headers: headers,
            })
            .then((response) => {
              console.log(response);
              reset(restaurantInitialValue);
              setError("");
              setImage("");
            })
            .catch((error) => {
              if (error.response.status === 400) {
                setError(error.response.data.message);
              } else {
                setError("");
              }
            });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(process.env.REACT_APP_BASE_URL + "addrestaurant", values, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          reset(restaurantInitialValue);
          setError("");
          setImage("");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setError(error.response.data.message);
          } else {
            setError("");
          }
        });
    }
  };

  return (
    <div className="card mt-5">
      {products ? (
        <>
          <form className="mt-5 mb-5" onSubmit={handleSubmit(onSubmit)}>
            {isEdit ? (
              <h2 className="text-center">Edit Item</h2>
            ) : (
              <>
                <h2 className="text-center">Add Item</h2>

                <div className="row justify-content-center mt-4 align-items-center">
                  <div className="col-2">
                    <label htmlFor="restaurant" className="form-label">
                      Choose Category
                    </label>
                  </div>
                  <div className="col-6">
                    <div className="row mt-2">
                      <div className="col-5 form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="fast food"
                          id="flexCheckDefault"
                          {...register("category")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Fast Food
                        </label>
                      </div>
                      <div className="col-5 form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="desi"
                          id="flexCheckDefault"
                          {...register("category")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Desi
                        </label>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5 form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="chinese"
                          id="flexCheckDefault"
                          {...register("category")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Chinese
                        </label>
                      </div>
                      <div className="col-5 form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="startups"
                          id="flexCheckDefault"
                          {...register("category")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          startups
                        </label>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5 form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="small plate"
                          id="flexCheckDefault"
                          {...register("category")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          small plate
                        </label>
                      </div>
                      <div className="col-5 form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="large plate"
                          id="flexCheckDefault"
                          {...register("category", {
                            required: "Please select atleast one category",
                          })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          large plate
                        </label>
                      </div>
                    </div>
                  </div>

                  <p className="ms-2 mt-2 warnings">
                    {errors.category && errors.category.message}
                  </p>
                </div>
              </>
            )}

            <div className="row justify-content-center mt-4 align-items-center">
              <div className="col-2">
                <label htmlFor="restaurant" className="form-label">
                  Choose Restaurant
                </label>
              </div>
              <div className="col-6">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register("restaurantName", {
                    required: "Restaurant is required",
                  })}
                >
                  <option value="" selected disabled>
                    Your Restaurants
                  </option>
                  {restaurantList()}
                </select>
                <p className="ms-2 mt-2 warnings">
                  {errors.restaurantName && errors.restaurantName.message}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-4 align-items-center">
              <div className="col-2">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
              </div>
              <div className="col-6">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register("status", {
                    required: "Status is required",
                  })}
                >
                  <option value="" selected disabled>
                    Select Status
                  </option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
                <p className="ms-2 mt-2 warnings">
                  {errors.status && errors.status.message}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-4 align-items-center">
              <div className="col-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
              </div>
              <div className="col-6">
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
                  {!errors.name && error}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-4 align-items-center">
              <div className="col-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
              </div>
              <div className="col-6">
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                <p className="ms-2 mt-2 warnings">
                  {errors.description && errors.description.message}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-4 align-items-center">
              <div className="col-2">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  {...register("price", {
                    required: "Price is required",
                    pattern: {
                      value: /^\d*(\.\d+)?$/,
                      message: "Price should be a decimal number and positive",
                    },
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.price && errors.price.message}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-4 align-items-center">
              <div className="col-2">
                <label htmlFor="upload" className="form-label">
                  Upload Photo
                </label>
              </div>
              <div className="col-6">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-auto">
                <button type="submit" className="button-style">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <form
            className="mt-5 mb-5"
            onSubmit={handleSubmit(onRestaurantSubmit)}
          >
            <h2 className="text-center">Add Restaurant</h2>
            <div className="row justify-content-center mt-5 align-items-center">
              <div className="col-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
              </div>
              <div className="col-6">
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
                  {!errors.name && error}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-5 align-items-center">
              <div className="col-2">
                <label htmlFor="shippingfee" className="form-label">
                  Shipping Fee
                </label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  id="shippingfee"
                  {...register("shippingFee", {
                    required: "Shipping Fee is required",
                    pattern: {
                      value: /^\d*(\.\d+)?$/,
                      message: "Price should be a decimal number and positive",
                    },
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.shippingFee && errors.shippingFee.message}
                </p>
              </div>
            </div>
            <div className="row justify-content-center mt-5 align-items-center">
              <div className="col-2">
                <label htmlFor="upload" className="form-label">
                  Upload Photo
                </label>
              </div>
              <div className="col-6">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-5">
              <div className="col-auto">
                <button type="submit" className="button-style">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddItem;
