import React, { useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const jwtToken = localStorage.getItem("access_token");
  let token = jwtToken;

  if (token) {
    return true;
  } else {
    return false;
  }
};

const PublicRoute = () => {
  const auth = useAuth();

  return auth ? <Navigate to="/Dashboard" /> : <Outlet />;
};

export default PublicRoute;
