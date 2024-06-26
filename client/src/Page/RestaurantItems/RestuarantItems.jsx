import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";
import Item from "../../Components/Item/Item";
import Header from "../../Components/Header/Header";

const RestuarantItems = () => {
  const { name } = useParams();
  let [items] = UseFetch(`products/all?name=${name}`);
  let [popularItems] = UseFetch(`orders/popular?name=${name}`);
  const [categorizeItems, setCategorizeItems] = useState();

  const handleCategoryChange = (e) => {
    const arr = items?.filter((item) => {
      for (const category of item.category) {
        if (category === e.target.value) {
          return category;
        }
      }
    });
    setCategorizeItems(arr);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-5">Explore New Items</h1>
        <div className="row justify-content-end">
          <div className="col-auto">
            <select
              value=""
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleCategoryChange(e)}
            >
              <option disabled value="" defaultValue="Choose a category">
                Choose a category
              </option>
              <option value="fast food">fast food</option>
              <option value="desi">desi</option>
              <option value="chinese">chinese</option>
              <option value="startups">startups</option>
              <option value="small plate">small plate</option>
              <option value="large plate">large plate</option>
            </select>
          </div>
        </div>
        <div className="row mt-5 mb-4">
          {categorizeItems ? (
            <>
              {categorizeItems?.map((item, key) => (
                <div className="col-4 gy-5" key={item._id}>
                  <Item item={item} product={"products"} />
                </div>
              ))}
            </>
          ) : (
            <>
              <h3>Popular Items in Restaurants</h3>
              {popularItems?.map((item) => (
                <div className="col-4 gy-4" key={item._id}>
                  <Item item={item} product={"products"} />
                </div>
              ))}
              <h3>Items in Restaurants</h3>
              {items?.map((item) => (
                <div className="col-4 gy-4" key={item._id}>
                  <Item item={item} product={"products"} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RestuarantItems;
