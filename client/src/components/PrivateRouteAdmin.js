import React from "react";

import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const isRoles = localStorage.getItem("role");

  return isRoles === "Owner" ? <Outlet /> : <Navigate to="/" />;
}

// return (
//   if(isRoles === "Owner") {
//     <Outlet />
//   } else {
//     <Navigate to="/" />
//   }
// )

// const isRoles = localStorage.getItem("roles");
// isSignin ? <Outlet /> : <Navigate to="/" />;
// return isRoles === "Owner" ? <Outlet /> : <Navigate to="/" />;
