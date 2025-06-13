import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLParagraphElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        if (message && messageRef.current) {
            gsap.fromTo(
                messageRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3 }
            );
        }
    }, [message]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("🎉 Registration successful!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(`❌ ${data.detail || "Registration failed"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("⚠️ An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-200 p-4 gap-14">
            {/* Blog Illustration */}
            <div className="hidden md:flex md:w-[40%] lg:w-[35%] justify-center items-center px-4">
                <img
                    src="/register.png"
                    alt="Blog illustration"
                    className="max-w-full h-auto object-contain"
                />
            </div>

            {/* Registration Form */}
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full max-w-sm md:w-[50%] p-6 md:p-8 bg-white rounded-2xl shadow-2xl border border-indigo-100"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-4">Join GyanAnchal</h2>

                <div className="mb-3">
                    <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Register
                </button>

                {message && (
                    <p
                        ref={messageRef}
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
                    Already have an account?{" "}
                    <span
                        className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
