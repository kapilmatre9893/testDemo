import React, { useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  let loggedIn = false;

  // Jwt token
  const jwtToken = localStorage.getItem("access_token");
  let token = jwtToken;

  if (token) {
    loggedIn = true;
  }

  return !loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
