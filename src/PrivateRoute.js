import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ path, element }) {
  const authed = localStorage.getItem("uid");

  return authed === null ? <Navigate to="/login" /> : <Outlet />;
}
