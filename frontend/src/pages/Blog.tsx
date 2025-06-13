import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, Clock, X } from "lucide-react";

const Blog = () => {
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      title: "My Journey into Web Development",
      description:
        "How I started learning web development and the challenges I faced along the way.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Personal",
    },
    {
      title: "Tips for Better Code Organization",
      description:
        "Best practices I've learned for keeping code clean and maintainable.",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Development",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const toggleForm = () => setShowForm(!showForm);


  interface BlogFormData {
    title: string;
    category: string;
    description: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: BlogFormData) => ({ ...prev, [name]: value }));
  };

  interface NewBlog extends BlogFormData {
    date: string;
    readTime: string;
    status: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBlog: NewBlog = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      readTime: "3 min read",
      status: "draft",
    };
    setBlogs([newBlog, ...blogs]);
    setFormData({ title: "", category: "", description: "" });
    toggleForm();
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
              Create a New Blog
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
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <textarea
                name="description"
                placeholder="Blog Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blog Cards */}
      <div className="space-y-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="relative p-5 border rounded-lg bg-white shadow hover:shadow-md transition"
          >
            {/* Edit/Delete Top-Right */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Edit2 className="cursor-pointer text-indigo-500 hover:text-indigo-700" />
              <Trash2 className="cursor-pointer text-red-500 hover:text-red-700" />
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              
              <span className=" text-gray-600 text-xs px-2 py-1 rounded-full bg-amber-100 border border-amber-400">
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
        ))}
      </div>
    </div>
  );
};

export default Blog;
