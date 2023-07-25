import React from "react";
import Header from "../../Components/Header/Header";

const Error = () => {
  return (
    <>
      <Header />
      <div className="container text-center mt-5">
        <h1>You are not logged in!</h1>
        <p className="mt-5">Please log in to checkout</p>
      </div>
    </>
  );
};

export default Error;
