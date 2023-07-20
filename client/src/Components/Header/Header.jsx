import React from "react";
import { Link } from "react-router-dom";
import './style.css'

const Header = () => {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand brandname ms-4">DinnerDash</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
      <ul className="navbar-nav navbar-items">
        <li className="nav-item">
          <a className="nav-link active" href='#'>Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Restaurants</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Categories</a>
        </li>
      </ul>
    </div>
    <button type="buton" className="button-style me-4">Login</button>
  </div>
</nav>  );
};

export default Header;
