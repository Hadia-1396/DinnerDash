import React from "react";
import Header from "../../Components/Header/Header";
import AddItem from "../../Components/AddItems/AddItem";

import { useLocation, useParams } from "react-router-dom";

const AddProduct = () => {
  const { id } = useParams();
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="row justify-content-center">
        <div className="col-5">
          <AddItem products={true} isEdit={location.state.isEdit} id={id} />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
