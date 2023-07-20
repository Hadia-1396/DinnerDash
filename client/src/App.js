import  React  from "react";
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
import Home from "../src/Page/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Restaurant from "./Page/Restaurants/Restaurant";
import Browse from "./Page/Browse/Browse";
import RestuarantItems from "./Page/RestaurantItems/RestuarantItems";
import Cart from "./Page/Cart/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header admin={false}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/browse" element={<Browse />}/>
          <Route path="/browse/:name" element={<RestuarantItems />}/>
          <Route path="/restaurant" element={<Restaurant/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
