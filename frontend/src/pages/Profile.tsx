import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, Calendar, Pencil, Lock, LogOut } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    date_joined: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/profile/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData(data);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordReset = () => {
    window.location.href = "/auth/password_reset/";
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (loading) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Account Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/3 bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="Avatar"
            className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-200 object-cover"
          />
          <h2 className="mt-4 text-xl font-medium text-gray-900">{profile.username}</h2>
          <p className="text-sm text-gray-600">{profile.email}</p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
            >
              <Pencil size={16} /> Edit Profile
            </button>
            <button
              onClick={handlePasswordReset}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <Lock size={16} /> Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            {editing ? "Edit Your Profile" : "Profile Information"}
          </h3>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5 text-gray-700">
              <div className="flex items-center gap-2">
                <User size={18} className="text-indigo-600" />
                <span className="font-medium">Username:</span>
                <span>{profile.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-indigo-600" />
                <span className="font-medium">Email:</span>
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-indigo-600" />
                <span className="font-medium">Joined:</span>
                <span>{new Date(profile.date_joined).toLocaleDateString()}</span>
              </div>
              <div>
                <p className="font-medium text-indigo-600 mb-1">Bio:</p>
                <p className="text-gray-800">{profile.bio || "No bio available."}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
