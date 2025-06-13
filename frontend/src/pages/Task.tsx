import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Plus, X } from "lucide-react";

interface TaskItem {
  title: string;
  description: string;
  status: "completed" | "pending";
}

const Task = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      title: "Build Todo Feature",
      description: "Add task creation, filter and pagination",
      status: "completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [formData, setFormData] = useState<TaskItem>({
    title: "",
    description: "",
    status: "pending",
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTasks([formData, ...tasks]);
    setFormData({ title: "", description: "", status: "pending" });
    setShowForm(false);
  };

  const markAsCompleted = (indexOnPage: number) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + indexOnPage;
    const updated: TaskItem[] = [...tasks];
    updated[globalIndex].status = "completed";
    setTasks(updated);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
          filter === "Completed"
            ? task.status === "completed"
            : task.status === "pending"
        );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">My Tasks</h1>
          <p className="text-gray-600">Manage your to-do list</p>
        </div>
        <button
          onClick={toggleForm}
          className="bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-800"
        >
          <Plus size={18} /> New Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f
                ? "bg-indigo-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-4">
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map((task, index) => (
            <div
              key={index}
              className="border p-5 rounded-lg shadow bg-white hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{task.description}</p>

              {task.status === "pending" && (
                <button
                  onClick={() => markAsCompleted(index)}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full text-sm ${
                currentPage === i + 1
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={toggleForm}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                required
              ></textarea>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button
                type="submit"
                className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
