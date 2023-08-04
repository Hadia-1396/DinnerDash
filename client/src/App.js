import  React, {useState, useEffect}  from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AddRestaurant from "./Page/AddRestaurants/AddRestaurant";
import AddProduct from "./Page/AddProducts/AddProduct";
import Browse from "./Page/Browse/Browse";
import RestuarantItems from "./Page/RestaurantItems/RestuarantItems";
import Cart from "./Page/Cart/Cart";
import Checkout from "./Page/Checkout/Checkout";
import Auth from "./Page/Auth/Auth";
import UnauthorizedError from "./Components/UnauthorizedError/UnauthorizedError";
import UserRole from "./Page/UserRole/UserRole";
import Profile from "./Page/Profile/Profile";
import OrderHistory from "./Page/OrderHistory/OrderHistory";
import Dashboard from "./Page/Dashboard/Dashboard";
import OrderDetails from "./Page/OrderDetail/OrderDetails";
import ProductDetail from "./Page/ProductDetail/ProductDetail";
import ManageCategory from "./Page/ManageCategory/ManageCategory";
import Error404 from "./Page/Error/Error404";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const userRole = {
  admin: 'admin',
  customer: 'customer'
} 

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/" element={<UserRole/>}/>
            <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} role={userRole.admin} unauthorizedAccess={false}/>}></Route>
            <Route path="/addproduct/:id" element={<ProtectedRoute Component={AddProduct} role={userRole.admin} unauthorizedAccess={false}/>}/>
            <Route path="/addrestaurant" element={<ProtectedRoute Component={AddRestaurant} role={userRole.admin} unauthorizedAccess={false}/>}/>
            <Route path="/addproduct" element={<ProtectedRoute Component={AddProduct} role={userRole.admin} unauthorizedAccess={false}/>}/>
            <Route path="/profile" element={<ProtectedRoute Component={Profile} role={userRole.admin} unauthorizedAccess={false}/>}/>
            <Route path="/productdetails/:id" element={<ProtectedRoute Component={ProductDetail} role={userRole.admin} unauthorizedAccess={false}/>}/>
            <Route path="/managecategory/:id" element={<ProtectedRoute Component={ManageCategory} role={userRole.admin} unauthorizedAccess={false}/>}/>
            <Route path="/orderdetails/:id" element={<ProtectedRoute Component={OrderDetails} role={userRole.admin} unauthorizedAccess={false}/>}/>
            
            <Route path="/home" element={<ProtectedRoute Component={Browse} role={userRole.customer} unauthorizedAccess={true}/>}/>
            <Route path="/browse/:name" element={<ProtectedRoute Component={RestuarantItems} role={userRole.customer} unauthorizedAccess={true}/>}/>
            <Route path="/cart" element={<ProtectedRoute Component={Cart} role={userRole.customer} unauthorizedAccess={true}/>}/>
            <Route path="/checkout" element={<ProtectedRoute Component={Checkout} role={userRole.customer} unauthorizedAccess={false}/>}/>
            <Route path="/orderhistory" element={<ProtectedRoute Component={OrderHistory} role={userRole.customer} unauthorizedAccess={true}/>}/>
            <Route path="/productdetails/:id" element={<ProtectedRoute Component={ProductDetail} role={userRole.customer} unauthorizedAccess={false}/>}/>
            <Route path="/errorpage" element={<UnauthorizedError/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
