import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("🎉 Login successful!");
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage(`❌ ${errorData.detail || "Login failed"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("⚠️ An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-200 p-4">
            {/* Welcome Section */}
            <div className="hidden md:flex md:w-[40%] lg:w-[35%] flex-col items-center justify-center px-4 text-center">
                <h1 className="text-3xl font-bold text-indigo-700 mb-4">Welcome Back!</h1>
                <p className="text-gray-700 text-base">
                    Login to access your dashboard and manage your content on GyanAnchal.
                </p>
            </div>

            {/* Login Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm md:w-[50%] p-6 md:p-8 bg-white rounded-2xl shadow-2xl border border-indigo-100"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-4">Login</h2>

                <div className="mb-3">
                    <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Login
                </button>

                {message && (
                    <p
                        className={`text-center mt-3 font-semibold ${message.startsWith("🎉")
                                ? "text-green-600"
                                : message.startsWith("⚠️")
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <p className="text-center text-sm mt-5 text-gray-700">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                    >
                        Register here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
