import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyAdmin } from "../Js";

const ProtectedRoute = ({ children, failDestination }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await verifyAdmin();
      
      if (response.error) {
        console.error("Authentication failed:", response.error);
        localStorage.clear();
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === false) {
    return <Navigate to={failDestination} replace/>;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
