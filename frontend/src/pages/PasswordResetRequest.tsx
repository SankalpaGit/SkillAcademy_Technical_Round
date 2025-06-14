import { useState, useEffect } from "react";

const PasswordResetRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [csrfToken, setCsrfToken] = useState("");

    // Fetch CSRF token from Django
    const fetchCsrfToken = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/csrf/", {
                credentials: "include", // Include cookies
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch CSRF token: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched CSRF Token:", data.csrfToken); // Debugging log
            setCsrfToken(data.csrfToken); // Store the CSRF token
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
    };

    useEffect(() => {
        fetchCsrfToken();
    }, []);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CSRF Token in handleSubmit:", csrfToken); // Debugging log
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/password_reset/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken, // Include CSRF token
            },
            body: JSON.stringify({ email }),
            credentials: "include", // Include cookies
        });

        if (response.ok) {
            setMessage("Password reset email sent. Please check your inbox.");
        } else {
            const errorData = await response.json();
            setMessage(errorData.error || "Failed to send password reset email. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
    }
};

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                    Send Reset Link
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        </div>
    );
};

export default PasswordResetRequest;