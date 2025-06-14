import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    // Check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem("access_token");

    useEffect(() => {
        if (!isAuthenticated) {
            setShowModal(true); // Show the modal if the user is not authenticated

            // Set a timeout to redirect after 5 seconds
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 5000);

            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return <>{children}</>;
    }

    if (redirect) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                        <h2 className="text-2xl font-semibold text-red-800 mb-3">Access Denied</h2>
                        <p className="text-gray-600 mb-6">You have to log in to access this page.</p>
                        <Link
                            to="/login"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            )}

        </>
    );
};

export default ProtectedRoute;