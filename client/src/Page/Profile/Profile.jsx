import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Item from "../../Components/Item/Item";
import UseFetch from "../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [items] = UseFetch(`getprofile/${id}`);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-5">Your Products</h1>
        <div className="row justify-content-end mt-4">
          <div className="col-auto">
            <button
              className="button-style"
              onClick={() => {
                navigate("/addproduct", {
                  state: {
                    isEdit: false,
                  },
                });
              }}
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="row mt-5">
          {items?.map((item, key) => (
            <div className="col-4 gy-5" key={items._id}>
              <Item item={item} products={"profile"} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
