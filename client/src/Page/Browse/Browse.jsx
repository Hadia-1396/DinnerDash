import Item from "../../Components/Item/Item";
import UseFetch from "../../Hooks/UseFetch";

const Browse = () => {
  const [items] = UseFetch("getrestaurants");
  return (
    <div className="container">
      <h1 className="text-center mt-5">Explore the Restaurants</h1>
      <div className="row mt-5">
        {items?.map((item) => (
          <div className="col-4" key={items._id}>
            <Item item={item} product={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
