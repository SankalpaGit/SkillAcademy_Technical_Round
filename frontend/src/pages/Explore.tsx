import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

interface BlogItem {
    id: number;
    title: string;
    content: string;
    author: string;
    published_date: string;
}

const Explore = () => {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    // Fetch all blogs from the API
    const fetchBlogs = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/blog/", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched blogs:", data);
                setBlogs(data.results); // ✅ Correctly setting the array of blogs
            } else {
                console.error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Filter blogs by search query
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-indigo-700">Explore</h1>
            <p className="mt-2 text-gray-600 text-lg">
                Discover new content and features in our application.
            </p>

            {/* Search Input */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            {/* Blog Cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {loading ? (
                    <p className="text-gray-500 col-span-full">Loading blogs...</p>
                ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="relative p-5 border rounded-lg bg-white shadow hover:shadow-md transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {blog.title}
                            </h2>
                            <p className="text-gray-600 text-sm mb-2">
                                {blog.content.length > 150
                                    ? `${blog.content.slice(0, 150)}...`
                                    : blog.content}
                            </p>
                            <div className="flex items-center justify-between text-gray-500 text-sm">
                                <span>By: {blog.author}</span>
                                <span>
                                    {new Date(blog.published_date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default Explore;
