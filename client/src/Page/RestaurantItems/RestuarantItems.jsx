import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../../Hooks/UseFetch";
import Item from "../../Components/Item/Item";

const RestuarantItems = () => {
  const { name } = useParams();
  let [items] = UseFetch(`getProducts/${name}`);
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
    <div className="container">
      <h1 className="text-center mt-5">Explore New Items</h1>
      <div className="row justify-content-end">
        <div className="col-auto">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => handleCategoryChange(e)}
          >
            <option selected value="">
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
      <div className="row mt-5">
        {categorizeItems ? (
          <>
            {categorizeItems?.map((item) => (
              <div className="col-4" key={items._id}>
                <Item item={item} product={true} />
              </div>
            ))}
          </>
        ) : (
          <>
            {items?.map((item) => (
              <div className="col-4" key={items._id}>
                <Item item={item} product={true} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RestuarantItems;