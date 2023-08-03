import React from "react";
import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import "./style.css";

const ManageCategory = () => {
  const { id } = useParams();
  const [items, fetchData] = UseFetch(`products/${id}`);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const removeCategory = (newCategory) => {
    const categoryArray = items.category.filter((item) => {
      return item !== newCategory;
    });

    axios
      .patch(
        process.env.REACT_APP_BASE_URL + `products/${id}`,
        {
          categoryArray: categoryArray,
        },
        { headers: headers }
      )
      .then((res) => fetchData())
      .catch((err) => console.log(err));
  };

  const addCategory = (value) => {
    let isExisted = false;
    const categoryArray = items.category;
    for (const iterator of categoryArray) {
      if (iterator === value) {
        isExisted = true;
      }
    }
    if (!isExisted) {
      categoryArray.push(value);
    } else {
      return;
    }

    axios
      .patch(
        process.env.REACT_APP_BASE_URL + `products/${id}`,
        {
          categoryArray: categoryArray,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="card pt-4 ps-5">
              <h1 className="text-center">Manage Categories</h1>
              <div className="row">
                <div className="col-auto">
                  <h3 className="mt-5">Add a Category to Product</h3>
                  <div className="row mt-3">
                    <div className="col-auto">
                      <select
                        value=""
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => addCategory(e.target.value)}
                      >
                        <option>Add a category</option>
                        <option value="fast food">fast food</option>
                        <option value="desi">desi</option>
                        <option value="chinese">chinese</option>
                        <option value="startups">startups</option>
                        <option value="small plate">small plate</option>
                        <option value="large plate">large plate</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <h3 className="mt-5">Product Categories</h3>
                    {items?.category.map((item, index) => (
                      <div className="col-auto mt-4" key={index}>
                        <span className="badge bg-secondary p-2 ps-3 pe-2">
                          {item}{" "}
                          <CloseIcon
                            className="ms-2"
                            onClick={() => removeCategory(item)}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;
