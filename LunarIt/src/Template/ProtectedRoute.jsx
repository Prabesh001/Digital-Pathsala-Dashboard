import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyAdmin } from "../Js";

const ProtectedRoute = ({ children, failDestination }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={failDestination} />;
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyAdmin(token);
        console.log(response);
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        return <Navigate to={failDestination} />;
      }
    };
    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
