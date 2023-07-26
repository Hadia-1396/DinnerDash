import React from "react";
import { useNavigate } from "react-router-dom";

const UserRole = () => {
  const navigate = useNavigate();

  return (
    <div className="login-background">
      <div className="row justify-content-center" style={{ marginTop: "25%" }}>
        <div className="col-auto">
          <button
            type="button"
            className="button-style"
            onClick={() => navigate("/auth/admin")}
          >
            Admin
          </button>
        </div>
        <div className="col-auto">
          <button
            className="button-style"
            onClick={() => navigate("/auth/customer")}
          >
            Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRole;