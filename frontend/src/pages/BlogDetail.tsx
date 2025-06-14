import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface BlogDetail {
    id: number;
    title: string;
    content: string;
    author: string;
    published_date: string;
}

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch blog details from the API
    const fetchBlogDetail = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else {
                console.error("Failed to fetch blog details");
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogDetail();
    }, [id]);

    if (loading) {
        return <p className="text-gray-500">Loading blog details...</p>;
    }

    if (!blog) {
        return <p className="text-gray-500">Blog not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-indigo-700">{blog.title}</h1>
            <p className="mt-2 text-gray-600 text-sm">
                By {blog.author} on {new Date(blog.published_date).toLocaleDateString()}
            </p>
            <div className="mt-6 text-gray-800 text-lg">{blog.content}</div>
        </div>
    );
};

export default BlogDetail;