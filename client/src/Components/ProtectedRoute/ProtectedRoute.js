import React from "react";

const ProtectedRoute = ({ Component, role }) => {
  let userRole = localStorage.getItem("role");

  return (
    <>
      {userRole === role ? (
        <Component />
      ) : (
        <>
          <h1 className="text-center mt-5">
            You are not authorized to access this page
          </h1>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
