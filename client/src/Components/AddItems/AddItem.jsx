import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import "./style.css";

const AddItem = ({ products }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const restaurantArray = restaurants?.map(
    (restaurant, key) => restaurant.name
  );
  const productArray = productsList?.map((product, key) => product.name);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getlist")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchNames = (e) => {
    axios
      .get(`http://localhost:3000/getproductlist/${e.target.value}`)
      .then((res) => setProductsList(res.data))
      .catch((err) => console.log(err));
  };

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
          values = Object.assign({ photoURL: data.url }, values);
          axios
            .post("http://localhost:3000/additem", values)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/additem", values)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
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
            .post("http://localhost:3000/addrestaurant", values)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

          axios
            .get("http://localhost:3000/getlist")
            .then((res) => setRestaurants(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/addrestaurant", values)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      axios
        .get("http://localhost:3000/getlist")
        .then((res) => setRestaurants(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="card mt-5">
      {products ? (
        <>
          <form className="mt-5 mb-5" onSubmit={handleSubmit(onSubmit)}>
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
                  onClick={(e) => fetchNames(e)}
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
                    validate: {
                      unique: (v) =>
                        !productArray.includes(v) ||
                        "Product name already exists",
                    },
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.name && errors.name.message}
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
                      value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
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
                    validate: {
                      unique: (v) =>
                        !restaurantArray.includes(v) ||
                        "Restaurant name already exists",
                    },
                  })}
                />
                <p className="ms-2 mt-2 warnings">
                  {errors.name && errors.name.message}
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
