import  React, {useState, useEffect}  from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AddRestaurant from "./Page/AddRestaurants/AddRestaurant";
import AddProduct from "./Page/AddProducts/AddProduct";
import Browse from "./Page/Browse/Browse";
import RestuarantItems from "./Page/RestaurantItems/RestuarantItems";
import Cart from "./Page/Cart/Cart";
import Checkout from "./Page/Checkout/Checkout";
import Auth from "./Page/Auth/Auth";
import Error from "./Page/Error/Error404";
import UserRole from "./Page/UserRole/UserRole";
import Profile from "./Page/Profile/Profile";
import OrderHistory from "./Page/OrderHistory/OrderHistory";
import Dashboard from "./Page/Dashboard/Dashboard";
import OrderDetails from "./Page/OrderDetail/OrderDetails";
import ProductDetail from "./Page/ProductDetail/ProductDetail";
import ManageCategory from "./Page/ManageCategory/ManageCategory";
import Error404 from "./Page/Error/Error404";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth/:role" element={<Auth/>}/>
          <Route path="/auth" element={<UserRole/>}/>
            <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} role="admin"/>}></Route>
            <Route path="/addproduct/:id" element={<ProtectedRoute Component={AddProduct} role="admin"/>}/>
            <Route path="/addrestaurant" element={<ProtectedRoute Component={AddRestaurant} role="admin"/>}/>
            <Route path="/addproduct" element={<ProtectedRoute Component={AddProduct} role="admin"/>}/>
            <Route path="/profile" element={<ProtectedRoute Component={Profile} role="admin"/>}/>
            <Route path="/productdetails/:id" element={<ProtectedRoute Component={ProductDetail} role="admin"/>}/>
            <Route path="/managecategory/:id" element={<ProtectedRoute Component={ManageCategory} role="admin"/>}/>
            
            <Route path="/" element={<ProtectedRoute Component={Browse} role="customer"/>}/>
            <Route path="/browse/:name" element={<ProtectedRoute Component={RestuarantItems} role="customer"/>}/>
            <Route path="/cart" element={<ProtectedRoute Component={Cart} role="customer"/>}/>
            <Route path="/checkout" element={<ProtectedRoute Component={Checkout} role="customer"/>}/>
            <Route path="/orderhistory" element={<ProtectedRoute Component={OrderHistory} role="customer"/>}/>
            <Route path="/orderdetails/:id" element={<ProtectedRoute Component={OrderDetails} role="customer"/>}/>
            <Route path="/productdetails/:id" element={<ProtectedRoute Component={ProductDetail} role="customer"/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
