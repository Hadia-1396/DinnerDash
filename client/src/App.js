import  React  from "react";
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
import Home from "../src/Page/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Restaurant from "./Page/Restaurants/Restaurant";

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/restaurant" element={<Restaurant/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
