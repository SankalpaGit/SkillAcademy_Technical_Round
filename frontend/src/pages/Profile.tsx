import { useState, useEffect } from "react";
import { Mail, User, Calendar, Pencil, Lock } from "lucide-react";

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

  // Fetch profile data
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
        setFormData(data); // Initialize form data with profile data
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile data
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
      console.log(response);

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow">
        {/* Avatar + Buttons */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300"
          />
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setEditing(true)}
              className="flex items-center justify-center gap-2 bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800 transition"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition">
              <Lock size={16} />
              Change Password
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col justify-center">
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
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
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-800">
                <User size={18} className="text-indigo-600" />
                <span className="font-medium">Full Name:</span>
                <span>
                  {profile.username}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-800">
                <Mail size={18} className="text-indigo-600" />
                <span className="font-medium">Email:</span>
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800">
                <Calendar size={18} className="text-indigo-600" />
                <span className="font-medium">Joined:</span>
                <span>{new Date(profile.date_joined).toLocaleString()}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-800">
                <span className="text-indigo-600 font-semibold">Bio:</span>
                <span>{profile.bio}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
