import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, Clock, X } from "lucide-react";

const Blog = () => {
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState<number | null>(null);

  const toggleForm = () => setShowForm(!showForm);

  const fetchBlogs = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/blog/my_posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const url = editMode
      ? `http://127.0.0.1:8000/api/blog/${editBlogId}/`
      : "http://127.0.0.1:8000/api/blog/";
    const method = editMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the blog list
        setFormData({ title: "", content: "" });
        setEditMode(false);
        setEditBlogId(null);
        toggleForm();
      } else {
        console.error("Failed to submit blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const handleEdit = (blog: any) => {
    setFormData({
      title: blog.title,
      content: blog.content,
    });
    setEditMode(true);
    setEditBlogId(blog.id);
    toggleForm();
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/blog/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the blog list
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">My Blogs</h1>
          <p className="text-gray-500">Manage and organize your blog posts</p>
        </div>
        <button
          onClick={toggleForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> New Blog
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={toggleForm}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              {editMode ? "Edit Blog" : "Create a New Blog"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />

              <textarea
                name="content"
                placeholder="Blog Content"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blog Cards */}
      <div className="space-y-6">
        {blogs.map((blog: any, index) => (
          <div
            key={index}
            className="relative p-5 border rounded-lg bg-white shadow hover:shadow-md transition"
          >
            {/* Edit/Delete Top-Right */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Edit2
                className="cursor-pointer text-indigo-500 hover:text-indigo-700"
                onClick={() => handleEdit(blog)}
              />
              <Trash2
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(blog.id)}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-2">

            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {blog.title}
            </h2>
            <p className="text-gray-600 text-sm">{blog.content}</p>
            <div className="flex items-center text-gray-500 text-sm gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Calendar size={16} /> {blog.published_date.split("T")[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
