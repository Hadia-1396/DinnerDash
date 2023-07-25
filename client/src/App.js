import  React  from "react";
import Footer from "../src/Components/Footer/Footer";
import Home from "../src/Page/Home/Home";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Home />}/>
          <Route path="/browse" element={<Browse />}/>
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
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
