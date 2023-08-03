import Item from "../../Components/Item/Item";
import UseFetch from "../../Hooks/UseFetch";
import Header from "../../Components/Header/Header";
const Browse = () => {
  const [items] = UseFetch("restaurants");
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-5">Explore the Restaurants</h1>
        <div className="row mt-5">
          {items?.map((item, key) => (
            <div className="col-4 gy-5" key={item._id}>
              <Item item={item} product={"restaurant"} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Browse;
