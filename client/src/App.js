import  React  from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AddRestaurant from "./Page/AddRestaurants/AddRestaurant";
import AddProduct from "./Page/AddProducts/AddProduct";
import Browse from "./Page/Browse/Browse";
import RestuarantItems from "./Page/RestaurantItems/RestuarantItems";
import Cart from "./Page/Cart/Cart";
import Checkout from "./Page/Checkout/Checkout";
import Auth from "./Page/Auth/Auth";
import Error from "./Page/Error/Error";
import UserRole from "./Page/UserRole/UserRole";
import Profile from "./Page/Profile/Profile";
import OrderHistory from "./Page/OrderHistory/OrderHistory";
import Dashboard from "./Page/Dashboard/Dashboard";
import OrderDetails from "./Page/OrderDetail/OrderDetails";
import ProductDetail from "./Page/ProductDetail/ProductDetail";
import ManageCategory from "./Page/ManageCategory/ManageCategory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/browse/:name" element={<RestuarantItems />}/>
          <Route path="/addrestaurant" element={<AddRestaurant/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/addproduct/:id" element={<AddProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/auth/:role" element={<Auth/>}/>
          <Route path="/auth" element={<UserRole/>}/>
          <Route path="/errorpage" element={<Error/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/orderhistory" element={<OrderHistory/>}/>
          <Route path="/orderdetails/:id" element={<OrderDetails/>}/>
          <Route path="/productdetails/:id" element={<ProductDetail/>}/>
          <Route path="/managecategory/:id" element={<ManageCategory/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
