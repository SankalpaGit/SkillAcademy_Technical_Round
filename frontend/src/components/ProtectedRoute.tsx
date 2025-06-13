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
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-2">Access Denied</h2>
                        <p>You have to be a member of GyanAnchal to access this page.</p>
                        <Link
                            to="/login"
                            className="mt-4 inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProtectedRoute;