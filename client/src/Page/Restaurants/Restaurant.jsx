import React from "react";
import AddItem from "../../Components/AddItems/AddItem";
import "./style.css";

const Restaurant = () => {
  return (
    <div className="row">
      <div className="col-5 offset-1">
        <AddItem products={true} />
      </div>
      <div className="offset-1 col-4">
        <AddItem products={false} />
      </div>
    </div>
  );
};

export default Restaurant;
