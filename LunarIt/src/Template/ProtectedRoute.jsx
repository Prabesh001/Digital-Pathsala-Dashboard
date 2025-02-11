import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ condition, failDestination, children }) => {
  return condition ? children : <Navigate to={failDestination} replace/>;
};

export default ProtectedRoute;
