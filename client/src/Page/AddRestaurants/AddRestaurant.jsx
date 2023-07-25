import React from "react";
import AddItem from "../../Components/AddItems/AddItem";
import "./style.css";
import Header from "../../Components/Header/Header";

const Restaurant = () => {
  return (
    <>
      <Header />
      <div className="row justify-content-center">
        <div className="col-5">
          <AddItem products={false} />
        </div>
      </div>
    </>
  );
};

export default Restaurant;
