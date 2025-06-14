import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<"checking" | "authorized" | "unauthorized">("checking");
  const [showModal, setShowModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        handleUnauthorized(); // No token case
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/todo/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setAuthStatus("authorized");
        } else {
          handleUnauthorized();
        }
      } catch (error) {
        console.error("Token validation error:", error);
        handleUnauthorized();
      }
    };

    const handleUnauthorized = () => {
      localStorage.removeItem("access_token");
      setAuthStatus("unauthorized");
      setShowModal(true);
      setTimeout(() => {
        setShouldRedirect(true);
      }, 5000);
    };

    validateToken();
  }, []);

  if (authStatus === "checking") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Validating access...</p>
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  if (authStatus === "unauthorized" && showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
          <p className="text-gray-600 mb-6">
            You are not authorized to access this page.<br />
            Redirecting to login in <span className="font-semibold">Wait for some seconds</span>...
          </p>
          <div className="animate-pulse text-sm text-red-600">Expired session...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
