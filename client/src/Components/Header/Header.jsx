import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "./style.css";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ admin }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand brandname ms-4">DinnerDash</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavDropdown"
        >
          {admin ? (
            <>
              <ul className="navbar-nav navbar-items">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/restaurant">
                    Restaurants
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Categories
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav navbar-items">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/browse">
                    Browse
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
        {!admin && (
          <ShoppingCartIcon
            fontSize="large"
            style={{ color: "white" }}
            onClick={() => navigate("/cart")}
          />
        )}
        {token ? (
          <button
            type="buton"
            className="ms-4 button-style me-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            type="buton"
            className="ms-4 button-style me-4"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
