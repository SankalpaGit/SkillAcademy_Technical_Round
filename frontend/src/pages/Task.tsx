import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

interface TaskItem {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

const Task = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [formData, setFormData] = useState<Omit<TaskItem, "completed">>({
    title: "",
    description: "",
  });

  const toggleForm = () => setShowForm(!showForm);

  const fetchTasks = async () => {
    const token = localStorage.getItem("access_token");

    let url = "http://127.0.0.1:8000/api/todo/";

    // Append query param based on filter
    if (filter === "Completed") {
      url += "?completed=true";
    } else if (filter === "Pending") {
      url += "?completed=false";
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sorted = data.results.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setTasks(sorted);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const url = editMode
      ? `http://127.0.0.1:8000/api/todo/${editTaskId}/`
      : "http://127.0.0.1:8000/api/todo/";
    const method = editMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, completed: false }),
      });

      if (response.ok) {
        setFormData({ title: "", description: "" });
        setShowForm(false);
        setEditMode(false);
        setEditTaskId(null);
        fetchTasks(); // re-fetch to update list
      } else {
        console.error("Failed to submit task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const toggleCompleted = async (id: number, currentStatus: boolean) => {
    const token = localStorage.getItem("access_token");
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: !currentStatus,
        }),
      });

      if (response.ok) {
        fetchTasks(); // refresh list
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task: TaskItem) => {
    setFormData({
      title: task.title,
      description: task.description,
    });
    setEditMode(true);
    setEditTaskId(task.id || null);
    setShowForm(true);
  };

  const confirmDelete = (id: number) => {
    setDeleteTaskId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/todo/${deleteTaskId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchTasks(); // refresh list
        setShowDeleteModal(false);
        setDeleteTaskId(null);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
        filter === "Completed" ? task.completed : !task.completed
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
            className={`px-3 py-1 rounded-full text-sm ${filter === f
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
          paginatedTasks.map((task) => (
            <div
              key={task.id}
              className="border p-5 rounded-lg shadow bg-white hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h2>
                <div className="flex gap-2">
                  <Edit2
                    className="cursor-pointer text-indigo-500 hover:text-indigo-700"
                    onClick={() => handleEdit(task)}
                  />
                  <Trash2
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => confirmDelete(task.id!)}
                  />
                </div>
              </div>
              <p className="text-gray-600 mb-2">{task.description}</p>

              <button
                onClick={() => toggleCompleted(task.id!, task.completed)}
                className="text-sm text-indigo-600 hover:underline"
              >
                Mark as {task.completed ? "Pending" : "Completed"}
              </button>
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
              className={`w-8 h-8 rounded-full text-sm ${currentPage === i + 1
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={toggleForm}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Task" : "Add New Task"}
            </h2>
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
              <button
                type="submit"
                className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
              >
                {editMode ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this task?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
