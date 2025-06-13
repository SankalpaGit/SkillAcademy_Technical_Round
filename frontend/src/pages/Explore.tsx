import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

const mockBlogs = [
    {
        title: "Exploring React Ecosystem",
        description: "Dive deep into React, Redux, Hooks, and more.",
        date: "2024-03-10",
        readTime: "6 min read",
        category: "Frontend",
    },
    {
        title: "Understanding APIs",
        description: "A beginner-friendly introduction to REST and GraphQL APIs.",
        date: "2024-02-28",
        readTime: "4 min read",
        category: "Backend",
    },
    {
        title: "Styling with Tailwind CSS",
        description: "Learn how utility-first styling makes frontend fast and efficient.",
        date: "2024-01-20",
        readTime: "5 min read",
        category: "UI/UX",
    },
];

const Explore = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    const categories = ["All", ...new Set(mockBlogs.map((blog) => blog.category))];

    const filteredBlogs = mockBlogs.filter((blog) => {
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            filterCategory === "All" || blog.category === filterCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-indigo-700">Explore</h1>
            <p className="mt-2 text-gray-600 text-lg">
                Discover new content and features in our application.
            </p>

            {/* Search & Filter */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Blog Cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, index) => (
                        <div
                            key={index}
                            className="relative p-5 border rounded-lg bg-white shadow hover:shadow-md transition"
                        >
                            <div className="flex flex-wrap gap-2 mb-2">

                                <span className="text-sm text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {blog.title}
                            </h2>
                            <p className="text-gray-600 text-sm">{blog.description}</p>
                            <div className="flex items-center text-gray-500 text-sm gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} /> {blog.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={16} /> {blog.readTime}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Explore;
